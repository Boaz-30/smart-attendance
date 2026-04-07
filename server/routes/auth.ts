import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Zod schemas for input validation
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const handleRegister: RequestHandler = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password } = validatedData;

    // Check if email already exists
    const existingLecturer = await prisma.lecturer.findUnique({
      where: { email },
    });

    if (existingLecturer) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new lecturer in database
    const lecturer = await prisma.lecturer.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Registration successful",
      user: { id: lecturer.id, name: lecturer.name, email: lecturer.email },
    });
  } catch (error) {
    next(error);
  }
};

export const handleLogin: RequestHandler = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find lecturer
    const lecturer = await prisma.lecturer.findUnique({
      where: { email },
    });

    if (!lecturer) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, lecturer.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: lecturer.id, email: lecturer.email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: { id: lecturer.id, name: lecturer.name, email: lecturer.email },
    });
  } catch (error) {
    next(error);
  }
};

// Middleware to verify token
export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    // Find user in database
    const lecturer = await prisma.lecturer.findUnique({
      where: { id: decoded.id },
    });

    if (!lecturer) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    // Attach user to request object
    (req as any).user = {
      id: lecturer.id,
      name: lecturer.name,
      email: lecturer.email,
    };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
