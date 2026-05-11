import api from "./api";

export const analyzeArticle = (data) => api.post("/analyze", data);
