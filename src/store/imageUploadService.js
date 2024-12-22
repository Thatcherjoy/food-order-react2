import { v2 as cloudinary } from "cloudinary-react";

export const uploadImage = async (file) => {
  try {
    // FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();

    return {
      originalUrl: data.secure_url,
      thumbnailUrl: data.thumbnail_url || data.secure_url, // Fallback if got no thumbnail
    };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
