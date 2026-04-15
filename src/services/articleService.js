import api from "./api";

export const getUsers = () => api.get("/users");

export const analyzeArticle = (data) => api.post("/analyze", data);
