export async function getAuthToken(): Promise<string> {
   const response = await fetch('/api/get-token', {
      method: 'GET',
      credentials: 'include' // Ensure cookies are sent with the request
   });
   if (response.ok) {
      const data = await response.json();
      return data.token;
   } else {
      throw new Error('Failed to get auth token');
   }
}
