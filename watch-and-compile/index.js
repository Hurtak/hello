const path = require('path')
const chokidar = require('chokidar')
const execa = require('execa')

const dirRoot = path.join(__dirname, '..')
const dirSrc = path.join(__dirname, '../src')

let scheduledRebuild = false
let buildRunning = false
let index = 0

// TODO: remove previously builded directory
chokidar.watch(dirSrc).on('all', (event, path) => {
  if (event === 'change') {
    index++
    console.log(`[${index}] files changed`)

    if (buildRunning) {
      scheduledRebuild = true
      return
    }

    runBuild()
  }
})

function runBuild () {
  const indexBuild = index

  console.log(`[${indexBuild}] starting compilation`)
  const start = Date.now()
  buildRunning = true
  return execa.shell('npm run build', { cwd: dirRoot }).then(() => {
    const end = Date.now()
    const time = ((end - start) / 1000).toFixed(2)
    console.log(`[${indexBuild}] compilation finished (${time}s)`)

    buildRunning = false
    if (scheduledRebuild) {
      runBuild()
      scheduledRebuild = false
    }
  })
}
