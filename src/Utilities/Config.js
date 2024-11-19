import axios from "axios";
import { Dimensions } from "react-native";

export const DeviceHeight=Dimensions.get('screen').height;
export const DeviceWidth=Dimensions.get('screen').width;
const BASE_URL='https://fakestoreapi.com/'
export const endPoinsts={
getAllData:BASE_URL+'products'
}
//dynamic api call
const apiInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // Optional: set a timeout for requests
    headers: {
      'Content-Type': 'application/json', // Default content type
    },
  });
  
  // Dynamic API function
  export const apiCall = async ({
    url,
    method = 'GET',
    headers = {},
    params = {},
    data = {},
  }) => {
    try {
      const response = await apiInstance.request({
        url,
        method,
        headers: {
          ...apiInstance.defaults.headers,
          ...headers, // Allow custom headers
        },
        params, // Query parameters for GET requests
        data, // Data for POST, PUT, PATCH requests
      });
  
      return response.data; // Returns the response data directly
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        // Server responded with a status outside of the 2xx range
        return {error: true, message: error.response.data || 'Server Error'};
      } else if (error.request) {
        // Request was made but no response was received
        return {
          error: true,
          message: 'No response from server. Check your network.',
        };
      } else {
        // Something went wrong in setting up the request
        return {error: true, message: error.message};
      }
    }
  };