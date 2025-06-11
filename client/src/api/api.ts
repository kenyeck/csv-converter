const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const API_ROUTES = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    UPLOAD_FILE: `${API_BASE_URL}/file/upload`,
    DOWNLOAD_FILE: `${API_BASE_URL}/file/download`,
    };

export const fetchLogin = async (username: string, password: string) => {
    console.log(`fetchLogin - ${API_ROUTES.LOGIN}, username: ${username}`);
    const response = await fetch(API_ROUTES.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

