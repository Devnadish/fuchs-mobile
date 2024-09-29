export const transformations = [
  "c_thumb", // Crop to thumbnail
  "w_48", // Width of 48 pixels
  "h_48", // Height of 48 pixels
  "g_face", // Gravity to focus on the face
];
export const generateCloudinaryUrl = (publicId, transformations) => {
  const baseUrl = process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT;
  console.log({ baseUrl });

  const transformationString = transformations.join(",");

  return `${baseUrl}${transformationString}/${publicId}`;
};

export const uploadImage = async (image, preset) => {
  const cloudName = "dhyh7aufp";

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", preset);
  data.append("cloud_name", cloudName);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "post",
      body: data,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  // data.append("tags","Onestop");
  // data.append("folder","Onestop");
  // data.append("api_key",process.env.CLOUDINARY_API_KEY);
  // data.append("timestamp", (Date.now() / 1000) | 0);
  // data.append("api_secret",process.env.CLOUDINARY_API_SECRET);

  return response;
};
