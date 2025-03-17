import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  message?: string;
}

export const LoginService = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('http://localhost:8000/api/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
