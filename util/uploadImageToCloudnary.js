import { Alert } from "react-native";

export const thumbnailTransformations = [
  "c_thumb", // Crop to thumbnail
  "w_48", // Width of 48 pixels
  "h_48", // Height of 48 pixels
  "g_face", // Gravity to focus on the face
];

export const regularImageTransformations = [
  "c_limit", // Limit the size of the image
  "w_800", // Width of 800 pixels
  "h_800", // Height of 800 pixels
  "q_auto", // Automatic quality adjustment
  "f_auto", // Automatic format selection
];

export const avatarUrl =
  "https://res.cloudinary.com/dhyh7aufp/image/upload/c_thumb,w_48,h_48,g_face/";

export const generateCloudinaryUrl = (publicId, transformations = []) => {
  const baseUrl = process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT;

  // Check if transformations is an array and has elements
  if (!Array.isArray(transformations) || transformations.length === 0) {
    Alert.alert(
      "Warning",
      "No transformations provided. Using default settings."
    );
  }

  const transformationString = transformations.join(",");

  return `${baseUrl}${transformationString}/${publicId}`;
};

export const uploadImage = async (image, preset, setLoading) => {
  const cloudName = "dhyh7aufp";

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", preset);
  data.append("cloud_name", cloudName);

  try {
    setLoading(true); // Set loading to true
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();
    // Alert.alert("Success", "Image uploaded successfully!");
    return result;
  } catch (error) {
    Alert.alert(
      "Error",
      "An error occurred while uploading the image: " + error.message
    );
    return null;
  } finally {
    setLoading(false); // Set loading to false after the operation
  }
};

// const ImageUploader = () => {
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = async (image, preset) => {
//     const result = await uploadImage(image, preset, setLoading);
//     // Handle the result as needed, e.g., update state or navigate
//   };

//   return (
//     <View>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         // Your upload button or any other UI component goes here
//       )}
//     </View>
//   );
// };

// export default ImageUploader;

// export const transformations = [
//   "c_thumb", // Crop to thumbnail
//   "w_48", // Width of 48 pixels
//   "h_48", // Height of 48 pixels
//   "g_face", // Gravity to focus on the face
// ];
// export const generateCloudinaryUrl = (publicId, transformations) => {
//   const baseUrl = process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT;

//   const transformationString = transformations.join(",");

//   return `${baseUrl}${transformationString}/${publicId}`;
// };

// export const uploadImage = async (image, preset) => {
//   const cloudName = "dhyh7aufp";

//   const data = new FormData();
//   data.append("file", image);
//   data.append("upload_preset", preset);
//   data.append("cloud_name", cloudName);

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//     {
//       method: "post",
//       body: data,
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return response;
// };
