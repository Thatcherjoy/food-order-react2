import axios from "axios";

const FREEIMAGE_API_KEY = "6d207e02198a847aa98d0a2a901485a5";

export const uploadImage = async (file) => {
  try {
    // object = FormData
    const formData = new FormData();
    formData.append("key", FREEIMAGE_API_KEY);
    formData.append("image", file);

    // API
    const response = await axios.post(
      "https://freeimage.host/api/1/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      originalUrl: response.data.image.url,
      thumbnailUrl: response.data.image.thumb.url,
    };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
