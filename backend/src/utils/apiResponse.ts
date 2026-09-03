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


export function pdfResponse(
  res: Response,
  pdf: Buffer,
  filename: string = "report.pdf"
) {
  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`
  );

  res.setHeader("Content-Length", pdf.length);

  return res.send(pdf);
}
export function csvResponse(
  res: Response,
  csv: Buffer,
  filename: string = "report.csv"
) {
  res.setHeader(
    "Content-Type",
    "text/csv; charset=utf-8"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`
  );

  res.setHeader(
    "Content-Length",
    csv.length
  );

  return res.send(csv);
}