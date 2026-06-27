import { Response } from "express";

export function apiResponse(
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown
) {
  return res.status(statusCode).json({
    statusCode,
    success: statusCode >= 200 && statusCode < 300,
    message,
    data: data ?? null
  });
}