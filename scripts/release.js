const fs = require("fs");
const path = require("path");
const execa = require("execa");
const dayjs = require("dayjs");

const filePaths = {
  rootDir: path.join(__dirname, ".."),
  changelog: path.join(__dirname, "../CHANGELOG.md"),
  packageJson: path.join(__dirname, "../package.json"),
  manifest: path.join(__dirname, "../public/manifest.json"),
};

async function main() {
  console.log("Running release script");

  process.chdir(filePaths.rootDir);
  console.log(`CWD: ${process.cwd()}`);

  console.log("");

  console.log("Getting version from CHANGELOG.md");
  const changelogString = fs.readFileSync(filePaths.changelog, "utf8");
  const isUnreleased = Boolean(changelogString.match(/^## \[Unreleased\]+/im));
  if (isUnreleased) {
    console.error(`  "Unreleased" version in changelog, exiting`);
    return;
  }

  const versionMatch = changelogString.match(/^## \[(.+)\]+/m);
  const versionChangelog = Array.isArray(versionMatch) && versionMatch[1] ? versionMatch[1] : null;
  if (!versionChangelog) {
    console.error("  Could not parse version from changelog, exiting");
    return;
  } else {
    console.log(`  OK, version: "${versionChangelog}"`);
  }

  const gitTag = `v${versionChangelog}`;

  console.log(`Check if tag "${gitTag}" does not already exist`);
  const gitTagExists = await execCommand("git", ["tag", "--list", gitTag]);
  if (gitTagExists) {
    console.error(`  Git tag "${gitTag}" already exists, exiting`);
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Checking if there is date in CHANGELOG.md`);
  const changelogDateMatch = changelogString.match(/^## \[.+\] - (\d{4}-\d{2}-\d{2})+/m);
  const changelogDate =
    Array.isArray(changelogDateMatch) && changelogDateMatch[1] ? changelogDateMatch[1] : null;
  if (!changelogDate) {
    console.error(`  Could not parse date from CHANGELOG.md, exiting`);
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Checking if there is current date in CHANGELOG.md`);

  const expectedDateString = dayjs().format("YYYY-MM-DD");
  if (expectedDateString !== changelogDate) {
    console.error(
      `  Date in CHANGELOG.md is not current date or it is in wrong format, expected ${expectedDateString}, given ${changelogDate}, exiting`,
    );
    return;
  } else {
    console.log("  OK");
  }

  process.exit(0);

  console.log(`Checking if there is correct version in package.json`);
  const packageJsonString = fs.readFileSync(filePaths.packageJson, "utf8");
  const packageJson = JSON.parse(packageJsonString);
  const versionPackageJson = packageJson.version;
  if (versionPackageJson !== versionChangelog) {
    console.error(
      `  Version from package.json "${versionPackageJson}" is not equal to version from changelog "${versionChangelog}", exiting`,
    );
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Checking if there is correct version in public/manifest.json`);
  const manifestString = fs.readFileSync(filePaths.manifest, "utf8");
  const manifest = JSON.parse(manifestString);
  const versionManifest = manifest.version;
  if (versionManifest !== versionChangelog) {
    console.error(
      `  Version from public/manifest.json "${versionManifest}" is not equal to version from changelog "${versionChangelog}", exiting`,
    );
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Pulling git tags`);
  await execCommand("git", ["pull", "--tags"]);
  console.log("  OK");

  console.log(`Checking if current branch is master`);
  const branchName = await execCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  if (branchName !== "master") {
    console.error(`  Current Git branch is "${branchName}", it must be "master", exiting`);
    return;
  } else {
    console.log("  OK");
  }

  console.log(`Checking if there are any uncommitted changes`);
  const gitStatus = await execCommand("git", ["status", "-s"]);
  if (gitStatus) {
    console.error(`  There are uncommitted changes, exiting`);
    return;
  } else {
    console.log("  OK");
  }

  console.log("Running validate script");
  await execCommand("npm", ["run", "validate"]);
  console.log("  OK");

  console.log(`Building the app`);
  await execCommand("npm", ["run", "build"]);
  console.log("  OK");

  console.log(`Creating the zip of builded app`);
  await execCommand("npm", ["run", "zip"]);
  console.log("  OK");

  console.log(`Git commit release`);
  await execCommand("git", ["commit", "--allow-empty", "--message", `release ${versionChangelog}`]);
  console.log("  OK");

  console.log(`Creating tag "${gitTag}"`);
  await execCommand("git", ["tag", "--annotate", gitTag, "--message", gitTag]);
  console.log(`  OK`);

  console.log(`Git push`);
  await execCommand("git", ["push"]);
  console.log("  OK");

  console.log(`Pushing tags`);
  await execCommand("git", ["push", "origin", gitTag]); // Tags are not pushed by regular `git push`.
  console.log(`  OK`);

  console.log("");
  console.log("DONE");
}

async function execCommand(...args) {
  let res;
  try {
    res = await execa(...args);
  } catch (e) {
    console.error(e.all);
    process.exit(1);
  }

  return res.stdout;
}

main();
