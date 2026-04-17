import api from "./api";

export const getTrainInformations = () => api.get("/train/informations");