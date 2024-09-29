export async function onRequest(context) {
  try {
    // Get the request URL
    const url = new URL(context.request.url);
    
    // Split the pathname and get the last segment
    const pathSegments = url.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Check if the last segment is valid
    if (!lastSegment) {
      return new Response("Invalid request: No key provided.", { status: 400 });
    }

    // Handle only PUT requests
    if (context.request.method !== "PUT") {
      return new Response("Method Not Allowed: This endpoint only supports PUT requests.", { status: 405 });
    }

    // Parse the request body as JSON
    const requestBody = await context.request.json();

    // Store the value in the Key-Value store using the last segment as the key
    await context.env.profit.put(lastSegment, JSON.stringify(requestBody));

    // Return a success response
    return new Response("Data updated successfully.", { status: 200 });
  } catch (error) {
    // Handle specific errors for JSON parsing or Key-Value store access
    if (error instanceof SyntaxError) {
      return new Response("Invalid JSON format.", { status: 400 });
    }
    
    console.error("Error processing request:", error);
    return new Response("Internal server error.", { status: 500 });
  }
}
