const AWS = require('../config/awsConfig');
const cognito = new AWS.CognitoIdentityServiceProvider();

const verifyToken = async (token) => {
  try {
    const params = {
      AccessToken: token //  from the frontend
    };
    const data = await cognito.getUser(params).promise();
    return data; // Cognito user details
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  verifyToken
};
