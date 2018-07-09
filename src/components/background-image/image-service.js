import Unsplash from "unsplash-js";

export const unsplash = new Unsplash({
  applicationId:
    "b3cb7c587939d02e81ceda270fdad22f5b0447ae92cec92503abebb6f9935328",
  secret: "63aa959d4d73e2ebeb6c5d71fcbaaad2ea13f6b4461516c14c7012127c48426e"
});

export async function getRandomImage(width, height) {
  let request = null;

  try {
    request = await unsplash.photos.getRandomPhoto({
      width: width,
      height: height
      // query: "Seal"
      // featured: true
    });
  } catch (error) {
    return {
      error: true,
      data: error
    };
  }

  if (request.status !== 200) {
    const text = await request.text();
    return {
      error: true,
      data: {
        status: request.status,
        body: text
      }
    };
  }

  // TODO: error handling
  const response = await request.json();

  return response;
}
