export const handleAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error("Response data:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request data:", error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error("Error message:", error.message);
  }
};
