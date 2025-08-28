import { Recipe } from '@/types/menu';

const API_BASE_URL = 'http://localhost:8081/api';

export const recommendationService = {
  async getRecommendations(goal: string, weight: number, height: number): Promise<Recipe[]> {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ goal, weight, height }),
    });
    if (!response.ok) {
      throw new Error('Error getting recommendations');
    }
    return response.json();
  },
};