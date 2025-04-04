import axios from 'axios';
import type { ListingsQueryParams } from '../types/properties';
//import type { ListingsQueryParams } from './types/properties';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const buildQueryParams = (params: ListingsQueryParams): Record<string, string> => {
  const queryParams: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams[key] = value.toString();
    }
  });
  
  return queryParams;
};

// API service functions
export const listingsApi = {
  getListings: async (params: ListingsQueryParams = {}) => {
    const queryParams = buildQueryParams(params);
    const response = await apiClient.get('/listings/get-listings', { params: queryParams });
    //console.log('fetched', response)
    return response.data.results;
  },
  
  getListingById: async (id: string) => {
    const response = await apiClient.get(`/listings/get-listing/${id}`);
    return response.data;
  },
  getListingByRegion: async () => {
    const response = await apiClient.get(`/listings/get-available-locations`);
    return response.data;
  },
};

export default apiClient;
