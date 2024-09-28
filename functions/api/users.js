import axios from 'axios';

// Clerk API key from environment variables
//const CLERK_API_KEY = "sk_test_NUjYYxQVKy0DVj0vPgEcFWFORIQJYilZIJyVSeHTEX";  // Use your environment variable setup

export async function onRequestGet(context) {
  const CLERK_API_KEY  = context.env.REACT_APP_CLERK_SECRET_KEY;
  try {
    // Make a request to the Clerk API to get the user list
    const response = await axios.get('https://api.clerk.com/v1/users', {
      headers: {
        Authorization: `Bearer ${CLERK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Send the list of users back to the client
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
