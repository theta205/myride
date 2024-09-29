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

    // Retrieve the value from the Key-Value store using the last segment as the key
    const task = await context.env.profit.get(lastSegment);

    // Check if the task was found
    if (!task) {
      return new Response("Not found: No data associated with the provided key.", { status: 404 });
    }

    // Return the response
    return new Response(task, { status: 200 });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error retrieving data:", error);
    return new Response("Internal server error.", { status: 500 });
  }
}
