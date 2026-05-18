

export type TableStatus = "Available" | "Occupied" | "Reserved" | "Inactive";

export type PrintableTable = {
  id?: string;
  number: string;
  capacity: number;
  status: TableStatus;
  qrDataUrl: string;
};

type Props = {
  tables: PrintableTable[];
  fileTitle?: string;
  buttonText?: string;
};

const chunkArray = <T,>(items: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};
const emptyTable: PrintableTable = {
  number:'',
  capacity:0,
  status:'Inactive',
  qrDataUrl:''
};
export default function TableQrPrint({
  tables,
  fileTitle = "All Table QR Codes",
  buttonText = "Print QR Codes",
}: Props) {
  const handlePrint = () => {
    const pages = chunkArray(tables, 6);

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${fileTitle}</title>
  <style>
    * {
      box-sizing: border-box;
    }

    @page {
      size: A4 portrait;
      margin: 8mm;
    }

    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      font-family: Arial, sans-serif;
      color: #111827;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 194mm;
      min-height: 281mm;
      page-break-after: always;
      break-after: page;
      display: flex;
      flex-direction: column;
    }

    .page:last-child {
      page-break-after: auto;
      break-after: auto;
    }

    .header {
      text-align: center;
      margin-bottom: 8mm;
    }

    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
    }

    .header p {
      margin: 4px 0 0;
      font-size: 12px;
      color: #64748b;
    }

    .grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 6mm;
    }

    .card {
      border: 1px solid #dbe2ea;
      border-radius: 14px;
      padding: 6mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5mm;
      background: #ffffff;
      page-break-inside: avoid;
      break-inside: avoid;
      min-height: 0;
    }

    .left {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 6px;
      color: #0f172a;
    }

    .meta {
      font-size: 13px;
      color: #475569;
      margin: 0;
      line-height: 1.5;
    }

    .right {
      width: 34mm;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .qr {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 3mm;
      background: #fff;
    }

    .qr img {
      width: 26mm;
      height: 26mm;
      object-fit: contain;
      display: block;
    }

    .empty {
      visibility: hidden;
    }

    @media print {
      html, body {
        width: 210mm;
        height: auto;
      }
    }
  </style>
</head>
<body>
  ${pages
    .map((pageItems, pageIndex) => {
      const filled = [...pageItems];
      while (filled.length < 6) filled.push(emptyTable);

      return `
        <section class="page">
          <div class="header">
            <h1>${fileTitle}</h1>
            <p>Page ${pageIndex + 1}</p>
          </div>

          <div class="grid">
            ${filled
              .map((table) =>
                table
                  ? `
                    <div class="card">
                      <div class="left">
                        <h2 class="title">${table.number}</h2>
                        <p class="meta">Capacity: ${table.capacity} Seats</p>
                        <p class="meta">Status: ${table.status}</p>
                      </div>
                      <div class="right">
                        <div class="qr">
                          <img src="${table.qrDataUrl}" alt="${table.number} QR" />
                        </div>
                      </div>
                    </div>
                  `
                  : `<div class="card empty"></div>`
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("")}

  <script>
    window.onload = function () {
      setTimeout(function () {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
    `;

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      alert("Please allow popups to print QR codes.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
    >
      {buttonText}
    </button>
  );
}