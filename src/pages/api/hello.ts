import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const timestamp = new Date().toISOString();

  return new Response(
    JSON.stringify({
      message: 'Hello from Astro API!',
      timestamp,
      userAgent,
      status: 'success'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    return new Response(
      JSON.stringify({
        message: 'Data received successfully!',
        receivedData: body,
        timestamp: new Date().toISOString(),
        status: 'success'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Invalid JSON data',
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'error'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};