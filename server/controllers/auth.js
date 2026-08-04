const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { successResponse, errorResponse } = require('../utils/response');

// ================= Register =================
const register = asyncHandler(async (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  const { username, email, password, avatarImage } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation failed', errors.array(), 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: username,
    email,
    password: hashedPassword,
    avatarImage,
    chatType: 'user'
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return successResponse(
    res,
    'Register Success',
    userResponse,
    201
  );
});

// ================= Login =================
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation failed', errors.array(), 400);
  }

  const user = await User.findOne({ name: username });

  if (!user) {
    return errorResponse(res, 'Unauthorized', null, 401);
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return errorResponse(res, 'Unauthorized', null, 401);
  }

  const accessToken = jwt.sign(
    { username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '3d' }
  );

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None',
    maxAge: 3 * 24 * 60 * 60 * 1000
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return successResponse(
    res,
    'Login Success',
    {
      ...userResponse,
      accessToken
    },
    200
  );
});

// ================= Refresh Token =================
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.signedCookies;

  if (!cookies?.jwt) {
    return errorResponse(res, 'Unauthorized', null, 401);
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return errorResponse(res, 'Forbidden', null, 403);
      }

      const user = await User.findOne({ name: decoded.username });

      if (!user) {
        return errorResponse(res, 'Unauthorized', null, 401);
      }

      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      return successResponse(
        res,
        'Access token refreshed',
        { accessToken },
        200
      );
    }
  );
});

// ================= Logout =================
const logout = asyncHandler(async (req, res) => {
  const cookies = req.signedCookies;

  if (!cookies?.jwt) {
    return errorResponse(res, 'Unauthorized', null, 401);
  }

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None'
  });

  return successResponse(
    res,
    'Logout Success',
    null,
    200
  );
});

module.exports = {
  register,
  login,
  refresh,
  logout
};