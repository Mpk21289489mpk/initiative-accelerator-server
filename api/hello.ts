export default (req, res) => {
  res.status(200).json({
    message: 'Backend is up!',
    time: new Date().toISOString()
  });
};
