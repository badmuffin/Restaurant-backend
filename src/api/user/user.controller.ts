import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "./user.model";

dotenv.config();

export const handleUserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // find the user with the given data
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    //compare the stored password and the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Crudentials" });

    // generate jwt token
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1hr" })
    // res.cookie("token", token); we will handle this in the frontend
    
    return res.json({ token, msg: "User logged in", user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred" });
  }
}

export const handleUserSignup = async (req: Request, res: Response) => {
  const {name, email, password} = req.body;
  try {
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({message: "User already exist"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();

    return res.status(200).json({message: "User Registered Successfully"});
  } catch (error) {
    res.status(500).json({message: "Server error occurred"});
  }
}