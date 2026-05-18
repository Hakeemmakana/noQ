import { useCallback, useEffect, useState } from "react";
import { Plus, Download } from "lucide-react";
import QRCode from "qrcode";
import { useOutletContext } from "react-router-dom";
import DeleteTableModal from "../components/DeleteTableModal";
import QrPreviewModal from "../components/QrPreviewModal";
import TableFormModal from "../components/TableFormModal";
import TablesTable from "../components/TablesTable";
import { tableService } from "../service/tableService";
import type { HotelTable, TableFormValues, TableStatus } from "../types/tableTypes";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";
import CommonPagination from "../../../common/CommonPagination";

type OutletContextType = {
    searchVal?: string;
};

export default function TablesPage() {
    const outletContext = useOutletContext<OutletContextType>();
    const searchVal = outletContext?.searchVal ?? "";

    const [tables, setTables] = useState<HotelTable[]>([]);
    const [page, setPage] = useState(1);
    //   const [limit] = useState(8);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(0);
    const [loading, setLoading] = useState(true);

    const [qrMap, setQrMap] = useState<Record<string, string>>({});

    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<HotelTable | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<HotelTable | null>(null);
    const [qrPreviewTarget, setQrPreviewTarget] = useState<HotelTable | null>(null);

    const loadTables = useCallback(async () => {
        setLoading(true);
        try {
            const res = await tableService.getTable(searchVal, page);
            setTables(res.data);
            setTotal(res.total);
            setLimit(res.limit)
            if (page !== res.page) setPage(res.page);
        } finally {
            setLoading(false);
        }
    }, [page, searchVal]);

    useEffect(() => {
        setPage(1);
    }, [searchVal]);

    useEffect(() => {
        loadTables();
    }, [loadTables]);

    useEffect(() => {
        const buildQrs = async () => {
            const entries = await Promise.all(
                tables.map(async (table) => {
                    const dataUrl = await QRCode.toDataURL(table.qrValue, {
                        width: 180,
                        margin: 1,
                    });
                    return [table.id, dataUrl] as const;
                })
            );

            setQrMap(Object.fromEntries(entries));
        };

        if (tables.length) {
            buildQrs();
        } else {
            setQrMap({});
        }
    }, [tables]);

    const handleAdd = async (values: TableFormValues) => {
        await tableService.addTable(values);
        await loadTables();
    };

    const handleEdit = async (values: TableFormValues) => {
        if (!editTarget) return;
        await tableService.editTable(editTarget.id, values);
        setEditTarget(null);
        await loadTables();
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await tableService.deleteTable(deleteTarget.id);
            setDeleteTarget(null);
            successToast('Table Delted successfully')
        } catch (error) {
            errorToast(error as string || 'something went wrong')
        }

        const nextPage = tables.length === 1 && page > 1 ? page - 1 : page;
        if (nextPage !== page) {
            setPage(nextPage);
        } else {
            await loadTables();
        }
    };

    const handleChangeStatus = async (id: string, status: TableStatus) => {
        try {
            await tableService.changeStatus(id, status);
            successToast('Table status updated ')
        } catch (error) {
            errorToast(error as string || 'something went wrong')
        }
        await loadTables();
    };

    const handlePageChange = async (nextPage: number) => {
        setPage(nextPage);
    };
    const downloadQrImage = (table: HotelTable) => {
        const qrDataUrl = qrMap[table.id];
        if (!qrDataUrl) return;

        const a = document.createElement("a");
        a.href = qrDataUrl;
        a.download = `${table.number}-qr.png`;
        a.click();
    };

    const handleDownloadAllQr = async () => {
        const all = await tableService.getTable(searchVal, 1);
        const allTables = all.data.length === all.total ? all.data : [];

        let finalTables = allTables;
        if (!finalTables.length && all.total > 8) {
            const collected: HotelTable[] = [];
            for (let currentPage = 1; currentPage <= all.totalPages; currentPage++) {
                const chunk = await tableService.getTable(searchVal, currentPage);
                collected.push(...chunk.data);
            }
            finalTables = collected;
        }
        const qrEntries = await Promise.all(
            finalTables.map(async (table:HotelTable) => ({
                ...table,
                qrDataUrl: await QRCode.toDataURL(table.qrValue, { width: 260, margin: 1 }),
            }))
        );

        const perPage = 8;
        const pages: typeof qrEntries[] = [];
        for (let i = 0; i < qrEntries.length; i += perPage) {
            pages.push(qrEntries.slice(i, i + perPage));
        }

        const printWindow = window.open("", "_blank", "width=1200,height=900");
        if (!printWindow) return;

        const html = `
      <html>
        <head>
          <title>All Table QR Codes</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; margin: 0; background: #fff; color: #111; }
            .page {
              width: 210mm;
              min-height: 297mm;
              padding: 12mm;
              page-break-after: always;
            }
            .page:last-child { page-break-after: auto; }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10mm;
            }
            .card {
              border: 1px solid #dbe2ea;
              border-radius: 16px;
              padding: 8mm;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 60mm;
            }
            .title {
              font-size: 16px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            .sub {
              font-size: 12px;
              color: #555;
              margin-bottom: 10px;
            }
            img {
              width: 42mm;
              height: 42mm;
              object-fit: contain;
            }
            @media print {
              body { background: #fff; }
            }
          </style>
        </head>
        <body>
          ${pages
                .map(
                    (pageItems) => `
              <section class="page">
                <div class="grid">
                  ${pageItems
                            .map(
                                (table) => `
                    <div class="card">
                      <div class="title">${table.number}</div>
                      <div class="sub">${table.capacity} Seats • ${table.status}</div>
                      <img src="${table.qrDataUrl}" alt="${table.number} QR" />
                    </div>
                  `
                            )
                            .join("")}
                </div>
              </section>
            `
                )
                .join("")}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
    };



    return (
        <section className="min-h-full bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>

                    </div>

                    <button
                        onClick={() => setAddOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                    >
                        <Plus size={18} />
                        Add Table
                    </button>
                </div>



                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    {loading ? (
                        <div className="space-y-3 p-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
                                />
                            ))}
                        </div>
                    ) : tables.length === 0 ? (
                        <div className="p-10 text-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No tables found</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Try a different search or add a new table.
                            </p>
                        </div>
                    ) : (
                        <TablesTable
                            tables={tables}
                            page={page}
                            limit={limit}
                            qrMap={qrMap}
                            onEdit={setEditTarget}
                            onDelete={setDeleteTarget}
                            onPreviewQr={setQrPreviewTarget}
                            onDownloadQr={downloadQrImage}
                            onChangeStatus={handleChangeStatus}
                        />
                    )}

                    <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                        <button
                            onClick={handleDownloadAllQr}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <Download size={16} />
                            Download QR All
                        </button>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <CommonPagination
                                page={page}
                                total={total}
                                onPageChange={handlePageChange}
                                limit={limit}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <TableFormModal
                open={addOpen}
                mode="add"
                onClose={() => setAddOpen(false)}
                onSubmit={handleAdd}
            />

            <TableFormModal
                open={!!editTarget}
                mode="edit"
                initialData={editTarget}
                onClose={() => setEditTarget(null)}
                onSubmit={handleEdit}
            />

            <DeleteTableModal
                open={!!deleteTarget}
                table={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />

            <QrPreviewModal
                open={!!qrPreviewTarget}
                title={qrPreviewTarget ? `${qrPreviewTarget.number} QR Code` : ""}
                qrDataUrl={qrPreviewTarget ? qrMap[qrPreviewTarget.id] : ""}
                onClose={() => setQrPreviewTarget(null)}
                onDownload={() => qrPreviewTarget && downloadQrImage(qrPreviewTarget)}
            />
        </section>
    );
}