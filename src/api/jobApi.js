// // src/api/jobApi.js
// import axios from "axios";
// const API = import.meta.env.VITE_API_BASE_URL;

// // 🔍 Get autocomplete title suggestions
// export const fetchSuggestions = async (query) => {
//   if (!query) return []; // avoid unnecessary calls

//   try {
//     const response = await axios.get(`${API}/jobs/suggestions`, {
//       params: { query },
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching suggestions:", error);
//     return [];
//   }
// };

// // 📄 Fetch jobs based on filters (title, location, category)
// export const fetchJobs = async ({ title, location, category }) => {
//   try {
//     const response = await axios.get(`${API}/jobs`, {
//       params: { search: title, category },
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return [];
//   }
// };


// // new changes
// // ✅ Fetch user's bookmarked jobs
// export const fetchBookmarks = async () => {
//   try {
//     const token = localStorage.getItem("token"); // or retrieve from your auth context
//     const res = await axios.get(`${API}/bookmarks`, {
//       withCredentials: true,
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching bookmarks:", err);
//     return [];
//   }
// };

// // ✅ Add bookmark
// export const addBookmark = async (jobId) => {
//   try {
//     const token = localStorage.getItem("token"); //new changes
//     const res = await axios.post(
//       `${API}/bookmarks`,
//       { jobId },
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (err) {
//     console.error("Error adding bookmark:", err);
//     throw err;
//   }
// };

// // ✅ Remove bookmark
// export const removeBookmark = async (jobId) => {
//   try {
//     await axios.delete(`${API}/bookmarks/${jobId}`, { withCredentials: true });

// src/api/jobApi.js
import api from "../utils/axiosInstance.js"; // Use the centralized instance

// 🔍 Get autocomplete title suggestions
export const fetchSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await api.get(`/jobs/search/suggestions`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

// 📄 Fetch jobs based on filters
export const fetchJobs = async ({ title, location, category }) => {
  try {
    // Note: your backend getJobs controller uses 'search' for title/description
    const response = await api.get(`/jobs`, {
      params: { search: title, category, location },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

// ✅ Fetch user's bookmarked jobs
export const fetchBookmarks = async () => {
  try {
    const res = await api.get(`/bookmarks`);
    return res.data;
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    return [];
  }
};

// ✅ Add bookmark
export const addBookmark = async (jobId) => {
  try {
    const res = await api.post(`/bookmarks`, { jobId });
    return res.data;
  } catch (err) {
    console.error("Error adding bookmark:", err);
    throw err;
  }
};

// ✅ Remove bookmark
export const removeBookmark = async (jobId) => {
  try {
    // Note: The backend route is /:jobId, but the controller uses findOneAndDelete on the full bookmark ID.
    // This assumes the backend is designed to find the bookmark via the user (from token) and jobId.
    await api.delete(`/bookmarks/${jobId}`);
  } catch (err) {
    console.error("Error removing bookmark:", err);
    throw err;
  }
};
//   } catch (err) {
//     console.error("Error removing bookmark:", err);
//     throw err;
//   }
// };
