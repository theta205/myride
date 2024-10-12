export async function onRequest(context) {
  const cloudName = context.env.CLOUD_NAME 
  const apiKey = context.env.CLOUD_KEY
  const apiSecret = context.env.CLOUD_SECRET
  // Create a URL object based on the incoming request URL
  const url = new URL(context.request.url);

  // Split the pathname and get the last segment (the public ID)
  const pathSegments = url.pathname.split('/');
  const publicId = pathSegments[pathSegments.length - 1];

  // Construct the API endpoint for the specific image
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${publicId}`;

  // Create Basic Authentication credentials using btoa
  const credentials = btoa(`${apiKey}:${apiSecret}`);

  try {
    console.log(`Fetching image details for: ${publicId}`);

    // Fetch the image details from Cloudinary
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching image details: ${response.status} - ${errorText}`);
      throw new Error(`Error fetching image details: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Image details:', data);

    // Return the image details as a JSON response
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS if necessary
      },
    });
  } catch (error) {
    console.log()
    console.error('Error:', error.message);
    return new Response('Internal Server Error', { status: 500 });
  }
}
