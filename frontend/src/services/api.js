import axios from "axios";

const API_URL = "http://localhost:8000/predict";

export const checkUrl = async (url) => {
  const response = await axios.post(API_URL, { url });
  return response.data;
};