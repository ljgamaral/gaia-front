import api from "./api";

export const getEnvironmentSummary = () =>
  api.get("/analysis/environment-summary", {
    params: {
      force_refresh: true,
    },
  });
