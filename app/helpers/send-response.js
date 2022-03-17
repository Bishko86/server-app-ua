module.exports = {
  response: (response, status, message) => {
    return response.status(status).json({ message });
  },
};
