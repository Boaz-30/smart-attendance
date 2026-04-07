import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const markAttendanceSchema = z.object({
  sessionCode: z.string(),
  studentName: z.string().min(1),
  indexNumber: z.string().min(1),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const markAttendance: RequestHandler = async (req, res, next) => {
  try {
    const validatedData = markAttendanceSchema.parse(req.body);
    const { sessionCode, studentName, indexNumber, location } = validatedData;

    // Find the session
    const session = await prisma.classSession.findUnique({
      where: { sessionCode },
    });

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    if (!session.isActive) {
      res.status(400).json({ message: "Session is not active" });
      return;
    }

    // Check if student already marked attendance for this session
    const existingRecord = await prisma.attendanceRecord.findFirst({
      where: {
        sessionId: session.id,
        indexNumber,
      },
    });

    if (existingRecord) {
      res.status(400).json({ message: "Attendance already marked for this session" });
      return;
    }

    // Calculate distance from class location
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      session.latitude,
      session.longitude,
    );

    const isValid = distance <= session.radius;

    // Create attendance record
    const attendanceRecord = await prisma.attendanceRecord.create({
      data: {
        sessionId: session.id,
        studentName,
        indexNumber,
        latitude: location.latitude,
        longitude: location.longitude,
        isValid,
      },
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      record: {
        ...attendanceRecord,
        location: {
          latitude: attendanceRecord.latitude,
          longitude: attendanceRecord.longitude,
        }
      },
      distance: Math.round(distance),
    });
  } catch (error) {
    next(error);
  }
};

export const getSessionAttendance: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const lecturer = (req as any).user;

    // Verify session belongs to lecturer
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

    const sessionAttendance = await prisma.attendanceRecord.findMany({
      where: { sessionId },
      orderBy: { timestamp: "desc" },
    });

    const formattedAttendance = sessionAttendance.map(record => ({
      ...record,
      location: {
        latitude: record.latitude,
        longitude: record.longitude,
      }
    }));

    res.json(formattedAttendance);
  } catch (error) {
    next(error);
  }
};

export const exportAttendance: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const lecturer = (req as any).user;

    // Verify session belongs to lecturer
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

    const sessionAttendance = await prisma.attendanceRecord.findMany({
      where: { sessionId },
      orderBy: { timestamp: "desc" },
    });

    // Create CSV content
    const csvHeader =
      "Student Name,Index Number,Timestamp,Status,Latitude,Longitude\n";
    const csvRows = sessionAttendance
      .map(
        (record) =>
          `"${record.studentName}","${record.indexNumber}","${record.timestamp.toISOString()}","${record.isValid ? "Valid" : "Invalid"}",${record.latitude},${record.longitude}`,
      )
      .join("\n");

    const csvContent = csvHeader + csvRows;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="attendance-${session.title}-${new Date().toISOString().split("T")[0]}.csv"`,
    );
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};
