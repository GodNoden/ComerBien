const API_BASE_URL = 'http://localhost:8081/api';

export const authService = {
  async register(userData: { 
    username: string; 
    email: string; 
    password: string;
    dietaryPreferences?: string[];
    excludedIngredients?: string[];
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, { // Cambiado a /auth/register
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json(); // Devuelve { token, type, id, username, email }
  },

  async login(credentials: { username: string; password: string; }) { // Cambiado a username en lugar de email
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json(); // Devuelve { token, type, id, username, email }
  },

  // Nuevos métodos para verificar disponibilidad
  async checkUsernameAvailability(username: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/auth/check-username/${username}`);
    if (!response.ok) {
      throw new Error('Failed to check username availability');
    }
    return response.json(); // Devuelve true si está disponible
  },

  async checkEmailAvailability(email: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/auth/check-email/${email}`);
    if (!response.ok) {
      throw new Error('Failed to check email availability');
    }
    return response.json(); // Devuelve true si está disponible
  },
};