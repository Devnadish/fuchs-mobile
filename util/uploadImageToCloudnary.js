import { upload } from "cloudinary-react-native";
import { cld } from "./cloudinary";

export const uploadImageToCloudnary = async (
  image,
  upload_preset,
  tag = "publicImage"
) => {
  // 1. ckech if user upload image
  if (!image) {
    return;
  }
  // FIXME: width and height are not working properly in cloudinary react native
  const options = {
    upload_preset: upload_preset,
    tag: tag,
    unsigned: true,
    width: 300, // Define the width here
    height: 400, // Define the height here
  };

  return new Promise(async (resolve, reject) => {
    await upload(cld, {
      file: image,
      options: options,

      callback: (error, response) => {
        if (error || !response) {
          //  showToast("something went wrong with image contact admin");
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};
