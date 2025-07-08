// fetch one image from strapi
export async function fetchStrapiImage(imageId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${imageId}`);
  if (!res.ok) {
    let errorMsg = `Failed to fetch image (status: ${res.status})`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.error?.message || errorData.message || JSON.stringify(errorData);
    } catch (e) {
      // If response is not JSON, keep the default errorMsg
    }
    console.error("Strapi API error:", errorMsg);
    throw new Error(errorMsg);
  }
  return await res.json();
}

// fetch all images from strapi
export async function fetchAllStrapiImages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files`);
  if (!res.ok) {
    let errorMsg = `Failed to fetch images (status: ${res.status})`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.error?.message || errorData.message || JSON.stringify(errorData);
    } catch (e) {
      // If response is not JSON, keep the default errorMsg
    }
    console.error("Strapi API error:", errorMsg);
    throw new Error(errorMsg);
  }
  return await res.json();
}