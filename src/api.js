import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-api-frmn.onrender.com/api", // ✅ point to backend + /api prefix
});

export const fetchQuestions = () => API.get("/questions");
export const fetchQuestionDetails = (id) => API.get(`/questions/${id}`); // Added for fetching a specific question
export const postQuestion = (data) => API.post("/questions", data);

export default API;
https://backend-api-frmn.onrender.com/