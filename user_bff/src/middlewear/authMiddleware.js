const cognitoService = require('../services/cognitoService');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const { userId } = req.body; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const cognitoUser = await cognitoService.verifyToken(token);
    const cognitoId = cognitoUser.Username;


    req.user = { userId, cognitoId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
