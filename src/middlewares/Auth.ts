import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // to extract the token from the authorization headet
  const token = req.header("Authorization")?.split(" ")[1];

  if(!token) {
    res.status(401).json({msg: "Access Denied. No Token Provided"});
    return
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
    // stor user info in response locals
    res.locals.user = verified; // check here if any error occurred
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}