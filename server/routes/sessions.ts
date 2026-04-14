import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const generateSessionCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const createSessionSchema = z.object({
  title: z.string().min(1),
  courseName: z.string().min(1),
  datetime: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  radius: z.number().positive(),
});

export const createSession: RequestHandler = async (req, res, next) => {
  try {
    const validatedData = createSessionSchema.parse(req.body);
    const { title, courseName, datetime, location, radius } = validatedData;
    const lecturer = (req as any).user;

    const sessionCode = generateSessionCode();
    
    // Check for unique session code collision (very rare but good practice)
    const existingCode = await prisma.classSession.findUnique({
      where: { sessionCode },
    });
    if (existingCode) {
      res.status(500).json({ message: "Failed to generate session code, try again" });
      return;
    }

    const session = await prisma.classSession.create({
      data: {
        lecturerId: lecturer.id,
        title,
        courseName,
        datetime: new Date(datetime),
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
        radius,
        sessionCode,
        qrCode: `${process.env.BASE_URL || "http://localhost:8080"}/attend/${sessionCode}`,
        isActive: true,
      },
    });

    res.status(201).json({
      ...session,
      location: {
        latitude: session.latitude,
        longitude: session.longitude,
        address: session.address,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLecturerSessions: RequestHandler = async (req, res, next) => {
  try {
    const lecturer = (req as any).user;
    const lecturerSessions = await prisma.classSession.findMany({
      where: { lecturerId: lecturer.id },
      orderBy: { datetime: "desc" },
    });

    const formattedSessions = lecturerSessions.map(session => ({
      ...session,
      location: {
        latitude: session.latitude,
        longitude: session.longitude,
        address: session.address,
      }
    }));

    res.json(formattedSessions);
  } catch (error) {
    next(error);
  }
};

export const getSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const lecturer = (req as any).user;

    const session = await prisma.classSession.findFirst({
      where: {
        id: sessionId,
        lecturerId: lecturer.id,
      },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    res.json({
      ...session,
      location: {
        latitude: session.latitude,
        longitude: session.longitude,
        address: session.address,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSessionByCode: RequestHandler = async (req, res, next) => {
  try {
    const { sessionCode } = req.params;
    const session = await prisma.classSession.findUnique({
      where: { sessionCode },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    res.json({
      id: session.id,
      title: session.title,
      courseName: session.courseName,
      datetime: session.datetime,
      location: {
        latitude: session.latitude,
        longitude: session.longitude,
        address: session.address,
      },
      radius: session.radius,
      sessionCode: session.sessionCode,
      isActive: session.isActive,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleSessionStatus: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const lecturer = (req as any).user;

    const session = await prisma.classSession.findFirst({
      where: {
        id: sessionId,
        lecturerId: lecturer.id,
      },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    const updatedSession = await prisma.classSession.update({
      where: { id: sessionId },
      data: { isActive: !session.isActive },
    });

    res.json({
      ...updatedSession,
      location: {
        latitude: updatedSession.latitude,
        longitude: updatedSession.longitude,
        address: updatedSession.address,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const endSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const lecturer = (req as any).user;

    const session = await prisma.classSession.findFirst({
      where: {
        id: sessionId,
        lecturerId: lecturer.id,
      },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    const updatedSession = await prisma.classSession.update({
      where: { id: sessionId },
      data: { isActive: false },
    });

    res.json({
      ...updatedSession,
      location: {
        latitude: updatedSession.latitude,
        longitude: updatedSession.longitude,
        address: updatedSession.address,
      },
      isEnded: true,
      endedAt: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
