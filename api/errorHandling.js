export const handleAxiosError = (error) => {
  if (error.response) {
    logResponseError(error.response);
  } else if (error.request) {
    logRequestError(error.request);
  } else {
    logGeneralError(error.message);
  }
};

const logResponseError = (response) => {
  console.error('Response Error:');
  console.error('Data:', response.data);
  console.error('Status:', response.status);
  console.error('Headers:', response.headers);
};

const logRequestError = (request) => {
  console.error('Request Error: No response received.');
  console.error('Request data:', request);
};

const logGeneralError = (message) => {
  console.error('General Error:', message);
};
