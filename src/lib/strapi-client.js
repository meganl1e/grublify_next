// fetch data for homepage
export async function fetchHome() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate[howItWorksSteps][populate]=image&populate=heroImage`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch homepage data');
  }
  const data = await res.json();
  return data?.data || null;
}


// fetch all blogs
export async function fetchBlogs() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?fields=slug&fields=title&populate=coverImage&populate=categories&fields=publishedDate`;
    
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('fetchBlogs: API error response:', errorText);
      throw new Error(`Failed to fetch blogs: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    
    const blogs = data?.data || null;
    
    return blogs;
  } catch (error) {
    console.error('fetchBlogs: Error occurred:', error);
    throw error;
  }
}

// fetch one blog by slug
export async function fetchBlogBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=coverImage&populate=categories`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data?.[0] || null;
}

// fetch all blog categories
export async function fetchBlogCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?fields=name&fields=slug&sort=name:asc`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }
    
    const data = await res.json();
    // console.log("categories", data)
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

// fetch blogs by categories
export async function fetchBlogsByCategory(categorySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[categories][slug][$eq]=${categorySlug}&fields=slug&fields=title&fields=publishedDate&populate=coverImage&populate=categories`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}

// fetch faqs
export async function fetchFaqs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  // console.log(data);
  return data?.data || null;
}

// fetch all recipes
export async function fetchRecipes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recipes?fields=name&fields=slug&populate=coverImage&populate=tags`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}

// fetch recipe by slug
export async function fetchRecipeBySlug(slug) {

  const query = `?filters[slug][$eq]=${slug}` +
  `&populate[ingredients][populate]=true` + // all ingredients
  `&populate[ingredients][populate]=imperial` + // imperial measurements for each ingredient
  `&populate[ingredients][populate]=metric` + // metric measurements for each ingredient
  `&populate[cookingMethods][populate]=instructions` + // recipe card cooking methods
  `&populate[detailedInstructions][populate]=images` + // detailed instruction images
  `&populate[coverImage][populate]=true` // cover image for some reason idk

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recipes${query}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data?.[0] || null;
}


// fetch all policies
export async function fetchPolicies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/policies?fields=title&fields=slug`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}

// fetch one policy by slug
export async function fetchPolicyBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/policies?filters[slug][$eq]=${slug}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data?.[0] || null;
}


// fetch one image from strapi by id (usually it's just a number)
// images are from media library
export async function fetchStrapiImageById(imageId) {
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

// fetch team info
export async function fetchTeam() {
  try {
    const query = '?populate[teamMembers][populate]=profilePicture';
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team${query}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch team data');
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching team data:', error);
    return null;
  }
}