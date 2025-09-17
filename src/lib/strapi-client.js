// fetch data for homepage
export async function fetchHome() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate[howItWorksSteps][populate]=image&populate=heroImage`,
    { 
      cache: 'force-cache',
      next: { revalidate: 3600 } // Revalidate every hour
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch homepage data');
  }
  const data = await res.json();
  return data?.data || null;
}


// fetch blogs with pagination
export async function fetchBlogs(page = 1, pageSize = 9) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?fields=slug&fields=title&fields=excerpt&populate=coverImage&populate=categories&fields=publishedDate&sort=publishedDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('fetchBlogs: API error response:', errorText);
      throw new Error(`Failed to fetch blogs: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    
    // Ensure we always return the expected structure
    const result = {
      blogs: data?.data || [],
      pagination: data?.meta?.pagination || null,
      total: data?.meta?.pagination?.total || 0
    };
    
    // console.log('fetchBlogs result:', result);
    return result;
  } catch (error) {
    console.error('fetchBlogs: Error occurred:', error);
    throw error;
  }
}

// fetch all blogs (for backward compatibility)
export async function fetchAllBlogs() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?fields=slug&fields=title&fields=excerpt&populate=coverImage&populate=categories&fields=publishedDate&sort=publishedDate:desc&pagination[pageSize]=100`;
    
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('fetchAllBlogs: API error response:', errorText);
      throw new Error(`Failed to fetch blogs: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    
    return data?.data || [];
  } catch (error) {
    console.error('fetchAllBlogs: Error occurred:', error);
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
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 } // Revalidate every hour
      }
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[categories][slug][$eq]=${categorySlug}&fields=slug&fields=title&fields=excerpt&fields=publishedDate&populate=coverImage&populate=categories`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.data || null;
}

// fetch faqs
export async function fetchFaqs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs`,
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    
    if (!res.ok) {
      console.error('Failed to fetch FAQs:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    // console.log(data);
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
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
    { 
      cache: 'force-cache',
      next: { revalidate: 3600 } // Revalidate every hour
    }
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
      { 
        cache: 'force-cache',
        next: { revalidate: 3600 } // Revalidate every hour
      }
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

// submit contact form to Strapi
export async function submitContact(contactData) {
  try {
    // console.log('Attempting to submit contact form to:', `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: contactData.name,
            email: contactData.email,
            subject: contactData.subject || 'General Inquiry',
            message: contactData.message,
            status: 'new',
            submittedAt: new Date().toISOString()
          }
        })
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Failed to submit contact: ${res.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
}