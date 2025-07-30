// create a klaviyo profile from an email
export async function createProfileFromEmail(email) {
  const response = await fetch('https://a.klaviyo.com/api/profiles', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Revision': '2025-07-15',               // Klaviyo API revision header
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Klaviyo-API-Key ${process.env.PRIVATE_KLAVIYO_API_KEY_EMAIL_LIST}`,
    },
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: {
          email,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create profile: ${response.status} - ${errorText}`);
  }

  // Check if response has content before parsing JSON
  const responseText = await response.text();
  if (!responseText) {
    throw new Error(`Failed to create profile: ${response.status} - Empty response`);
  }

  const data = JSON.parse(responseText);
  return data?.data || null;
}


// add a profile to a klaviyo list by profile id and list id
export async function addProfileToList(profileId, listId) {
  if (!profileId) {
    throw new Error('Profile ID is required');
  }
  if (!listId) {
    throw new Error('List ID is required');
  }

  const response = await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Revision': '2025-07-15',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Klaviyo-API-Key ${process.env.PRIVATE_KLAVIYO_API_KEY_EMAIL_LIST}`,
    },
    body: JSON.stringify({
      data: [
        {
          type: 'profile',
          id: profileId,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add profile to list: ${response.status} - ${errorText}`);
  }

  // Check if response has content before parsing JSON
  const responseText = await response.text();
  if (!responseText) {
    // For successful list additions, Klaviyo might return empty response
    return { success: true };
  }

  const data = JSON.parse(responseText);
  return data?.data || null;
}
