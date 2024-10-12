export async function onRequest(context) {
  const cloudName =context.env.CLOUD_NAME 
  const apiKey = context.env.CLOUD_KEY
  const apiSecret = context.env.CLOUD_SECRET
  const uploadPreset = "userProfiles"; // Optional: if you have an upload preset configured

  try {
    // Parse the incoming request body for form data (expecting an image file)
    const formData = await context.request.formData();
    const file = formData.get("file"); // Assuming 'file' is the key for the file upload

    // Validate that a file was uploaded
    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    // Prepare Cloudinary-specific fields
    const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", file);
    cloudinaryData.append("api_key", apiKey);
    cloudinaryData.append("timestamp", timestamp);
    if (uploadPreset) {
      cloudinaryData.append("upload_preset", uploadPreset); // Optional preset
    }
    const publicId = formData.get("public_id"); // Get public_id from the form data
    if (publicId) {
      cloudinaryData.append("public_id", publicId);
    }

    // Generate the signature
    const signature = await generateSignature(formData, timestamp, apiSecret);
    cloudinaryData.append("signature", signature);

    // Send the image file to Cloudinary
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: cloudinaryData,
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error uploading image: ${response.status} - ${errorText}`);
      return new Response(`Error uploading image: ${response.statusText}`, { status: response.status });
    }

    // Parse the JSON response from Cloudinary
    const data = await response.json();
    console.log('Upload successful:', data);

    // Return the Cloudinary response as a JSON response
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS if necessary
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Function to generate SHA-1 signature
async function generateSignature(formData, timestamp, apiSecret) {
  const paramsToSign = new URLSearchParams();

  // Collect parameters from formData, excluding certain keys
  for (const [key, value] of formData.entries()) {
    if (!["file", "cloud_name", "resource_type", "api_key"].includes(key)) {
      paramsToSign.append(key, value);
    }
  }

  // Include timestamp
  paramsToSign.append("timestamp", timestamp);

  // Sort parameters alphabetically and create the string to sign
  const sortedParams = [...paramsToSign.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const signatureString = sortedParams.map(([key, value]) => `${key}=${value}`).join('&') + apiSecret;

  // Log the raw signature string for debugging
  console.log("Raw Signature String: ", signatureString);

  // Generate SHA-1 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}
