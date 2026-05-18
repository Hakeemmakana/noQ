// src/pages/RestaurantOrderingLanding.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Loader2, QrCode, UtensilsCrossed } from "lucide-react";
import QrScannerSheet from "../components/QrScannerSheet";
import TableDetectedModal from "../components/TableDetectedModal";
import { validateQrLink } from "../service/orderingService";
import type { ScanQrApiResponse, ScanState } from "../types/orderingType"

export default function RestaurantOrderingLanding() {
  const navigate = useNavigate();

  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [error, setError] = useState("");
  const [detectedHotel, setDetectedHotel] = useState<ScanQrApiResponse | null>(null);
  const { hotelId, tableId } = useParams();

  useEffect(() => {
    const autoValidate = async () => {
      // if no params don't call API
      if (!hotelId || !tableId) return;

      try {
        setScanState("validating");

        // create qr-like link
        const qrLink = `${hotelId}/${tableId}`;

        const response = await validateQrLink(qrLink);

        setDetectedHotel(response);
        setScanState("success");
        setScannerOpen(false);
        // redirect directly
      //   navigate(`/${response.hotelSlug}/menu`);
      } catch (err:unknown) {
        setScanState("error");
        if(err instanceof Error ){
          setError(err.message);
        }else{
          setError("Invalid QR");
        }
      }
    };

    autoValidate();
  }, [hotelId, tableId]);

  const handleDetected = async (decodedText: string) => {
    try {
      setScanState("validating");
      setError("");

      const response = await validateQrLink(decodedText);
      setDetectedHotel(response);
      setScanState("success");
      setScannerOpen(false);
    } catch (err: unknown) {
      setScanState("error");
      if(err instanceof Error){
        setError(err.message);
      }else{
        setError("Unable to detect QR details");
      }
    }
  };

  const handleContinue = () => {
    if (!detectedHotel?.hotelSlug) return;
    navigate(`/${detectedHotel.hotelSlug}/menu`);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_45%,#f6f8fc_100%)] dark:bg-[linear-gradient(180deg,#0f172a_0%,#1e2937_45%,#0f172a_100%)] text-slate-900 dark:text-slate-100">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid w-full items-center gap-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_20px_80px_rgba(0,0,0,0.4)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 dark:border-sky-900 dark:bg-sky-950">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
                  Smart ordering
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">NoQ Restaurant</p>
              </div>
            </div>

            <div className="mt-8 max-w-xl">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Scan the table QR and start ordering instantly
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                Use your camera or upload a QR image. We will verify the table,
                show hotel details, and take the customer directly to the menu.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setScannerOpen(true);
                  setScanState("scanning");
                }}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                <QrCode className="h-5 w-5" />
                Scan or Upload QR
              </button>

              <div className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border border-slate-200 px-6 py-4 text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Fast table verification
              </div>
            </div>

            {scanState === "validating" && (
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Validating QR and loading hotel details...
              </div>
            )}
          </div>

          <div className="relative h-full min-h-[320px] border-t border-slate-100 bg-slate-50 p-6 sm:p-8 dark:border-slate-700 dark:bg-slate-800 lg:border-l lg:border-t-0">
            <div className="mx-auto flex h-full max-w-md items-center">
              <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 dark:border-slate-700">
                  <div className="aspect-[4/3] w-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.16),_transparent_60%)]" />
                  <div className="pointer-events-none absolute inset-5 rounded-[24px] border-2 border-white/80" />
                  <div className="pointer-events-none absolute left-5 right-5 top-10 h-1 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.9)] animate-pulse" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
                      <QrCode className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-medium text-white/80">
                      Camera and QR preview
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Scan flow</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Detect QR, verify table, open menu
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <QrScannerSheet
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onDetected={handleDetected}
        loading={scanState === "validating"}
        error={error}
      />

      <TableDetectedModal
        open={!!detectedHotel}
        hotelName={detectedHotel?.hotelName || ""}
        hotelSlug={detectedHotel?.hotelSlug || ""}
        hotelImage={detectedHotel?.hotelImage || ""}
        tableNumber={detectedHotel?.tableNumber || ""}
        onClose={() => setDetectedHotel(null)}
        onContinue={handleContinue}
      />
    </div>
  );
}