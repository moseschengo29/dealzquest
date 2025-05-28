import { getTokensInCookies } from "../features/auth/authCookies";

const baseUrl = import.meta.env.VITE_API_URL;
const {accessToken} = getTokensInCookies()


export async function getSearchHistory(){
    const res = await fetch(`${baseUrl}/api/user/search-history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }
      });


    if(!res.ok){
        throw new Error('Could not fetch the user search history');
    }
    const data = await res.json()

    return data;
}

export async function getFavourites(){
  const res = await fetch(`${baseUrl}/api/user/favorites/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    });


  if(!res.ok){
      throw new Error('Could not fetch the user search history');
  }
  const data = await res.json()

  return data;
}

export async function getRecommendedProducts(){
  const res = await fetch(`${baseUrl}/api/recommended_products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    });


  if(!res.ok){
      throw new Error('Could not fetch the user search history');
  }
  const data = await res.json()

  return data;
}

export async function removeItemFromFavourites(id) {
  const { accessToken } = getTokensInCookies();

  const response = await fetch(
    `${baseUrl}/api/user/favorites/${id}/`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  if (response.ok || response.status === 204) {
    // No content or successful deletion
    return;
  } else {
    // Handle error
    throw new Error('Failed to remove item');
  }
}

export async function clearAllSearches() {
  const { accessToken } = getTokensInCookies();

  const response = await fetch(
    `${baseUrl}/api/user/clear/search-history/`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  if (response.ok) {
    // No content or successful deletion
    return;
  } else {
    // Handle error
    throw new Error('Failed to clear search history');
  }
}


export async function removeSearchItem(id) {
  const { accessToken } = getTokensInCookies();

  const response = await fetch(
    `${baseUrl}/api/user/search-history/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  if (response.ok) {
    // No content or successful deletion
    return;
  } else {
    // Handle error
    throw new Error('Failed to clear search history');
  }
}

export async function getReviews(){
  const res = await fetch(`${baseUrl}/api/reviews/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    });


  if(!res.ok){
      throw new Error('Could not fetch the user search history');
  }
  const data = await res.json()

  return data;
}

export async function postReview(formData) {
  const { accessToken } = getTokensInCookies();

  const response = await fetch(`${baseUrl}/api/reviews/`, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json', // 👈 crucial
      },
      body: JSON.stringify(formData), // ✅ Critical: Convert JS object to JSON string
  });

  const data = await response.json();

  if (response.ok || response.status === 201) {
      return data;
  } else if (response.status === 400) {
      throw new Error(data.message);
  } else {
      throw new Error('Failed to add staff');
  }
}

export async function postVote(formData) {
  console.log(formData)
  const { accessToken } = getTokensInCookies();

  const response = await fetch(`${baseUrl}/api/review-votes/`, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json', // 👈 crucial

      },
      body: JSON.stringify(formData), // ✅ Critical: Convert JS object to JSON string
    });

  const data = await response.json();

  if (response.ok || response.status === 201) {
      return data;
  } else if (response.status === 400) {
      throw new Error(data.message);
  } else {
      throw new Error('Failed to add staff');
  }
}