import axios from 'axios';

const API_KEY = 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export default {
  async fetchNeoData(startDate, endDate) {
    try {
      const response = await axios.get(
        `${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
};
