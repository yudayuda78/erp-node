import * as authService from "./auth.service";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { authService, refreshToken, user } = await authService.login(
      req.body,
    );
    res.status(200).json({
      success: true,
      secure: process.env.Node_ENV === "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    next(err);
  }
};
