import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleRegister, handleLogin, authenticateToken } from "./routes/auth";
import {
  createSession,
  getLecturerSessions,
  getSession,
  getSessionByCode,
  toggleSessionStatus,
  endSession,
} from "./routes/sessions";
import {
  markAttendance,
  getSessionAttendance,
  exportAttendance,
} from "./routes/attendance";
import { errorHandler } from "./utils/errorHandler";
import { logger } from "./utils/logger";

export function createServer() {
  const app = express();

  // CORS Configuration
  // In development: allows all origins for flexibility during testing
  // In production: restricts to FRONTEND_URL for security
  const corsOrigin = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "*";

  // Validate production CORS configuration
  if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_URL) {
    logger.warn(
      "⚠️  WARNING: FRONTEND_URL is not set in production. " +
      "This may cause CORS issues. Set FRONTEND_URL in your environment variables."
    );
  }

  // Middleware
  app.use(cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger middleware
  app.use((req, res, next) => {
    logger.info(`Incoming ${req.method} request to ${req.path}`);
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);

  // Session routes (protected)
  app.post("/api/sessions", authenticateToken, createSession);
  app.get("/api/sessions", authenticateToken, getLecturerSessions);
  app.get("/api/sessions/:sessionId", authenticateToken, getSession);
  app.put(
    "/api/sessions/:sessionId/toggle",
    authenticateToken,
    toggleSessionStatus,
  );
  app.put("/api/sessions/:sessionId/end", authenticateToken, endSession);

  // Attendance routes
  app.get("/api/attend/:sessionCode", getSessionByCode); // Public route for students
  app.post("/api/attendance", markAttendance); // Public route for students
  app.get(
    "/api/sessions/:sessionId/attendance",
    authenticateToken,
    getSessionAttendance,
  );
  app.get(
    "/api/sessions/:sessionId/export",
    authenticateToken,
    exportAttendance,
  );

  // Global error handler
  app.use(errorHandler);

  return app;
}
