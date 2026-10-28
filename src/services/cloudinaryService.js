/**
 * Cloudinary Unsigned Upload Service
 * Allows direct image upload from frontend without exposing secret API keys
 */

export const isCloudinaryConfigured = Boolean(
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME &&
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
);

/**
 * Upload an image file directly to Cloudinary
 * @param {File} file
 * @param {string} folder (optional folder name in Cloudinary media library)
 * @returns {Promise<string>} The secure HTTPS CDN URL of the uploaded image
 */
export async function uploadToCloudinary(file, folder = "portfolio") {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary is not configured. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Cloudinary upload failed with status ${response.status}`
    );
  }

  const result = await response.json();
  return result.secure_url;
}
