module.exports = {
  handleError: (response, status, message) => {
    return response.status(status).json({ message });
  },
};
