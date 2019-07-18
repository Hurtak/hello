export async function loadAndInjectFonts() {
  return await Promise.all([
    loadFont({
      name: "Roboto",
      src: `${process.env.PUBLIC_URL}/assets/fonts/roboto-v19-latin-regular.woff2`,
      weight: 400,
    }),
    loadFont({
      name: "Roboto",
      src: `${process.env.PUBLIC_URL}/assets/fonts/roboto-v19-latin-700.woff2`,
      weight: 700,
    }),

    loadFont({
      name: "Lato",
      src: `${process.env.PUBLIC_URL}/assets/fonts/lato-v15-latin-regular.woff2`,
      weight: 400,
    }),
    loadFont({
      name: "Lato",
      src: `${process.env.PUBLIC_URL}/assets/fonts/lato-v15-latin-700.woff2`,
      weight: 700,
    }),
  ]);
}

async function loadFont({
  name,
  src,
  style = "normal",
  weight,
}: {
  name: string;
  src: string;
  style?: string;
  weight: number;
}) {
  var font = new FontFace(name, `url("${src}")`, {
    style,
    weight: String(weight),
  });

  await font.load();

  document.fonts.add(font);
}
