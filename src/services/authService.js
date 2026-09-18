import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js"; // Updated path

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  return await userModel.createUser({ username, email, passwordHash });
};

export const loginUser = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user: { id: user.id, username: user.username, email: user.email } };
};