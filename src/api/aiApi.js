

// src/api/aiApi.js
import api from "../utils/axiosInstance.js"; // Use the centralized instance

// Analyze resume content
export const analyzeResume = (data) => api.post(`/ai/analyze-resume`, data);

// Recommend jobs based on skills
export const recommendJobs = (data) => api.post(`/ai/recommend-jobs`, data);

// Generate a cover letter
export const generateCoverLetter = (data) => api.post(`/ai/generate-cover-letter`, data);

// Chat assistant for user queries
export const chatAssistant = (data) => api.post(`/ai/chat`, data);

// Note: smartJobPost is not defined on your backend, but we'll leave the function here.
export const smartJobPost = (data) => api.post(`/ai/smart-job-post`, data);
