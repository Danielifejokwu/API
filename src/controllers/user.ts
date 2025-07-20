import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from 'express-async-handler';
import { UserDbModel } from "../models/user";
import bcrypt from 'bcrypt';
import {ensureUserCrendentialIsValid, generateToken } from "../utils/helpers";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  await ensureUserCrendentialIsValid(username, password, res);
  
  const user = await User.getByEmail(username);
  const token = generateToken(user,password, res);

  const response = {
    message: "login successful",
    token,
  };
  res.status(200).json(response);
});

const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.getUsers();
  debugger;
  res.status(200).json({ message: "Get all users", users });
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await User.createUser({ name, email });

  res.status(201).json({
    message: "User created",
    user
  });
});


const setUserPassword = asyncHandler(async (req: Request, res: Response) => {

  const { password } = req.body;
  const { id } = req.params;

  const user = await User.getById(id);
  if (!user) {
    res.status(404).json({ message: 'User doesn\'t not exist' });
  }

  const salt = await bcrypt.genSalt(5);
  const encryptedPassword = await bcrypt.hash(password, salt);
  User.updatePassword(id, encryptedPassword);

  const data = {
    message: "User password updated",
    user
  };
  res.status(200).json(data);

});
const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.getById(id);

  res.status(200).json({
    message: "Get user by id",
    user
  });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updated = await UserDbModel.findByIdAndUpdate(
    id,
    { name, email, updatedAt: new Date() },
    { new: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error("User not found");
  }

  const { _id, createdAt, updatedAt } = updated;
  res.status(200).json({
    message: "User updated",
    user: { id: _id, name, email, createdAt, updatedAt }
  });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await UserDbModel.findByIdAndDelete(id);
  if (!deleted) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "User deleted",
    user: {
      id: deleted._id,
      name: deleted.name,
      email: deleted.email
    }
  });
});

const getRenderedUser = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.getUsers();
  res.render('user', { title: "Get Users", users });
});

const UserController = {
  getUsers,
  createUser,
  getById,
  updateUser,
  deleteUser,
  getRenderedUser,
  setUserPassword,
  login,
};

export default UserController;
