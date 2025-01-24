const errorHandler = (error, req, res, next) => {
  console.error(error); // Use console.error to highlight this as an error in logs

  if (error.name === 'CastError') {
      return res.status(400).send({ error: 'Malformatted ID' });
  } 
  
  if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
  } 
  
  if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ error: 'Expected `username` to be unique' });
  }

  if (error.name === 'JsonWebTokenError') {
      if (error.message === 'jwt must be provided') {
          return res.status(401).json({ error: 'Unauthorized access - Token missing' });
      }
      return res.status(401).json({ error: 'Invalid token' });
  }

  // Fallback for unhandled errors
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
