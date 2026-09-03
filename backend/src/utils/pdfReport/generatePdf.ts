import PDFDocument from "pdfkit";
import { IRevenueReport } from "../../dtos/report/res.reportDto";

export function generateRevenueReportPdf(
  report: IRevenueReport
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // -------------------------
    // HEADER
    // -------------------------

    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Revenue Report", {
        align: "center",
      });

    doc.moveDown(0.3);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `From: ${formatDate(report.period.startDate)}   To: ${formatDate(
          report.period.endDate
        )}`,
        {
          align: "center",
        }
      );

    doc.moveDown(1);

    // -------------------------
    // SUMMARY
    // -------------------------

    doc.fontSize(14).font("Helvetica-Bold").text("Revenue Summary");
    doc.moveDown(0.3);

    const summary = report.summary;

    const summaryRows: [string, string][] = [
      ["Total Orders", summary.totalOrders.toString()],
      ["Total Items", summary.totalItems.toString()],
      ["Gross Revenue", formatCurrency(summary.grossRevenue)],
      ["Paid Revenue", formatCurrency(summary.paidRevenue)],
      ["Unpaid Revenue", formatCurrency(summary.unpaidRevenue)],
      ["Cancelled Revenue", formatCurrency(summary.cancelledRevenue)],
      ["Net Revenue", formatCurrency(summary.netRevenue)],
      ["Average Order Value", formatCurrency(summary.averageOrderValue)],
    ];

    const labelWidth = 220;
    const valueWidth = 200;
    const labelX = 60;
    const valueX = 320;

    summaryRows.forEach(([label, value]) => {
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#222222")
        .text(label, labelX, doc.y, {
          width: labelWidth,
          align: "left",
        });

      doc
        .font("Helvetica-Bold")
        .text(value, valueX, doc.y - 12, {
          width: valueWidth,
          align: "right",
        });

      doc.moveDown(0.35);
    });

    doc.moveDown(0.8);

    // -------------------------
    // DAILY REVENUE
    // -------------------------

    doc.fontSize(14).font("Helvetica-Bold").text("Daily Revenue");
    doc.moveDown(0.3);

    drawDailyRevenueTable(doc, report);

    doc.moveDown(1);

    // -------------------------
    // PRODUCT REVENUE
    // -------------------------

    doc.fontSize(14).font("Helvetica-Bold").text("Product Revenue");
    doc.moveDown(0.3);

    drawProductRevenueTable(doc, report);

    doc.addPage();

    // -------------------------
    // ORDER DETAILS
    // -------------------------

    doc.fontSize(14).font("Helvetica-Bold").text("Order Details");
    doc.moveDown(0.3);

    drawOrderTable(doc, report);

    doc.end();
  });
}

// -------------------------
// HELPERS
// -------------------------

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// -------------------------
// DAILY REVENUE TABLE
// -------------------------

function drawDailyRevenueTable(
  doc: PDFKit.PDFDocument,
  report: IRevenueReport
) {
  const startX = 40;

  // Columns: Date, Orders, Items, Revenue
  const columnWidths = [150, 90, 90, 140];
  const headers = ["Date", "Orders", "Items", "Revenue"];
  const alignments: ("left" | "center" | "right")[] = ["left", "center", "center", "right"];

  const rowHeight = 22;
  const headerHeight = 24;

  // Draw header box
  drawBoxHeader(doc, headers, startX, columnWidths, headerHeight);

  doc.moveDown(0.15);

  report.dailyRevenue.forEach((row) => {
    ensurePageSpace(doc, rowHeight + 6);

    const y = doc.y;

    doc.font("Helvetica").fontSize(9).fillColor("#222222");

    const cells = [
      { text: formatDate(row.date), width: columnWidths[0] },
      { text: row.totalOrders.toString(), width: columnWidths[1] },
      { text: row.totalItems.toString(), width: columnWidths[2] },
      { text: formatCurrency(row.revenue), width: columnWidths[3] },
    ];

    let x = startX;
    cells.forEach((cell, i) => {
      doc.text(cell.text, x + 5, y + 5, {
        width: cell.width - 10,
        align: alignments[i],
      });
      x += cell.width;
    });

    // Row bottom border
    doc
      .strokeColor("#e5e5e5")
      .lineWidth(0.5)
      .moveTo(startX, y + rowHeight)
      .lineTo(startX + columnWidths.reduce((a, b) => a + b, 0), y + rowHeight)
      .stroke();

    doc.y = y + rowHeight;
  });
}

// -------------------------
// PRODUCT REVENUE TABLE
// -------------------------

function drawProductRevenueTable(
  doc: PDFKit.PDFDocument,
  report: IRevenueReport
) {
  const startX = 40;

  // Columns: Product, Qty, Revenue
  const columnWidths = [280, 100, 140];

  const headers = [
    "Product",
    "Qty",
    "Revenue",
  ];

  const alignments: (
    | "left"
    | "center"
    | "right"
  )[] = [
    "left",
    "center",
    "right",
  ];

  const rowHeight = 22;
  const headerHeight = 24;

  drawBoxHeader(
    doc,
    headers,
    startX,
    columnWidths,
    headerHeight
  );

  doc.moveDown(0.15);

  report.productRevenue.forEach((row) => {
    ensurePageSpace(
      doc,
      rowHeight + 6
    );

    const y = doc.y;

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#222222");

    const cells = [
      {
        text: row.productName ?? "",
        width: columnWidths[0],
      },
      {
        text: row.quantity.toString(),
        width: columnWidths[1],
      },
      {
        text: formatCurrency(row.revenue),
        width: columnWidths[2],
      },
    ];

    let x = startX;

    cells.forEach((cell, i) => {
      doc.text(
        cell.text,
        x + 5,
        y + 5,
        {
          width: cell.width - 10,
          align: alignments[i],
        }
      );

      x += cell.width;
    });

    // Row bottom border
    const tableWidth = columnWidths.reduce(
      (sum, width) => sum + width,
      0
    );

    doc
      .strokeColor("#eaeaea")
      .lineWidth(0.5)
      .moveTo(
        startX,
        y + rowHeight
      )
      .lineTo(
        startX + tableWidth,
        y + rowHeight
      )
      .stroke();

    // Move to next row
    doc.y = y + rowHeight;
  });
}

// -------------------------
// ORDER DETAILS TABLE
// -------------------------

function drawOrderTable(doc: PDFKit.PDFDocument, report: IRevenueReport) {
  const startX = 30;

  // Columns: Date, Order, Product, Qty, Price, Total, Payment
  const columnWidths = [70, 80, 160, 50, 70, 80, 70];
  const headers = ["Date", "Order", "Product", "Qty", "Price", "Total", "Payment"];
  const alignments: ("left" | "center" | "right")[] = [
    "left",
    "left",
    "left",
    "center",
    "right",
    "right",
    "left",
  ];

  const rowHeight = 22;
  const headerHeight = 24;

  drawBoxHeader(doc, headers, startX, columnWidths, headerHeight);

  doc.moveDown(0.15);

  report.orders.forEach((order) => {
    ensurePageSpace(doc, rowHeight + 8);

    const y = doc.y;

    doc.font("Helvetica").fontSize(8).fillColor("#222222");

    const cells = [
      { text: formatDate(order.date), width: columnWidths[0] },
      { text: order.orderId.toString().slice(-8), width: columnWidths[1] },
      { text: order.productName, width: columnWidths[2] },
      { text: order.quantity.toString(), width: columnWidths[3] },
      { text: formatCurrency(order.price), width: columnWidths[4] },
      { text: formatCurrency(order.total), width: columnWidths[5] },
      { text: order.paymentStatus, width: columnWidths[6] },
    ];

    let x = startX;
    cells.forEach((cell, i) => {
      doc.text(cell.text, x + 4, y + 5, {
        width: cell.width - 8,
        align: alignments[i],
      });
      x += cell.width;
    });

    // Row bottom border
    doc
      .strokeColor("#e5e5e5")
      .lineWidth(0.5)
      .moveTo(startX, y + rowHeight)
      .lineTo(startX + columnWidths.reduce((a, b) => a + b, 0), y + rowHeight)
      .stroke();

    doc.y = y + rowHeight;
  });
}

// -------------------------
// BOX HEADER (STRUCTURED)
// -------------------------

function drawBoxHeader(
  doc: PDFKit.PDFDocument,
  headers: string[],
  startX: number,
  columnWidths: number[],
  headerHeight: number
) {
  const y = doc.y;
  const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

  // Header background box
  doc
    .fillColor("#f3f4f6")
    .rect(startX, y - 2, tableWidth, headerHeight)
    .fill();

  // Header text
  let x = startX;
  headers.forEach((header, i) => {
    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(8)
      .text(header, x + 5, y + 5, {
        width: columnWidths[i] - 10,
      });
    x += columnWidths[i];
  });

  // Bottom border of header
  doc
    .strokeColor("#d1d5db")
    .lineWidth(0.5)
    .moveTo(startX, y + headerHeight - 2)
    .lineTo(startX + tableWidth, y + headerHeight - 2)
    .stroke();

  doc.y = y + headerHeight + 4;
}

// -------------------------
// PAGE SPACE
// -------------------------

function ensurePageSpace(doc: PDFKit.PDFDocument, requiredHeight: number) {
  const pageHeight = doc.page.height;
  const bottomMargin = 40;
  const usableBottom = pageHeight - bottomMargin;

  if (doc.y + requiredHeight > usableBottom) {
    doc.addPage();
    doc.y = 40;
  }
}