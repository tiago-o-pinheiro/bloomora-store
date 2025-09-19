import { utapi } from "@/app/api/uploadthing/core";
import { getImageKey } from "@/lib/helpers/get-image-key";

export const deleteImage = async (image: string): Promise<boolean> => {
  try {
    const imageKey = getImageKey(image);
    await utapi.deleteFiles([imageKey]);
    return true;
  } catch (error) {
    console.error("UploadThing delete failed (image):", error);
    return false;
  }
};

export const deleteImages = async (images: string[]): Promise<boolean> => {
  try {
    const imageKeys = images.map((image) => getImageKey(image));
    await utapi.deleteFiles(imageKeys);
    return true;
  } catch (error) {
    console.error("UploadThing delete failed (images):", error);
    return false;
  }
};
