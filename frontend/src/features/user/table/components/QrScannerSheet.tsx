import { useEffect, useRef, useState } from "react";
import { Camera, ImageUp, Loader2, QrCode, XCircle } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import AppModal from "../common/CommonAppModal";
import { errorToast } from "../../../../shared/utils/toastNotification";

type QrScannerSheetProps = {
  open: boolean;
  loading?: boolean;
  error?: string;
  onClose: () => void;
  onDetected: (decodedText: string) => Promise<void> | void;
};

const SCANNER_ID = "restaurant-qr-reader";

export default function QrScannerSheet({
  open,
  loading,
  error,
  onClose,
  onDetected,
}: QrScannerSheetProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isStartingRef = useRef(false);
  const isDetectedRef = useRef(false);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const stopScanner = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }
      if (scannerRef.current) {
        await scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch {
      scannerRef.current = null;
    } finally {
      isStartingRef.current = false;
      setCameraOpen(false);
      setScannerLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      stopScanner();
      setLocalError("");
      isDetectedRef.current = false;
    }

    return () => {
      stopScanner();
    };
  }, [open]);

  const handleOpenCamera = async () => {
    if (isStartingRef.current || scannerRef.current?.isScanning) return;

    try {
      setLocalError("");
      setCameraOpen(true);
      setScannerLoading(true);
      isStartingRef.current = true;
      isDetectedRef.current = false;

      const scanner = new Html5Qrcode(SCANNER_ID);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: { exact: "environment" } },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        async (decodedText) => {
          if (isDetectedRef.current) return;
          isDetectedRef.current = true;

          await stopScanner();
          await onDetected(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );
    } catch (err) {
      errorToast(err as string ?? 'something went wrong')
      try {
        if (scannerRef.current) {
          await scannerRef.current.clear();
          scannerRef.current = null;
        }
      } catch(error){
        errorToast(error as string ?? 'something went wrong')
      }

      try {
        const fallbackScanner = new Html5Qrcode(SCANNER_ID);
        scannerRef.current = fallbackScanner;

        await fallbackScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          async (decodedText) => {
            if (isDetectedRef.current) return;
            isDetectedRef.current = true;

            await stopScanner();
            await onDetected(decodedText);
          },
          () => {
            // ignore scan frame errors
          }
        );
      } catch {
        setLocalError("Unable to access camera. Please allow permission or upload a QR image.");
        setCameraOpen(false);
      }
    } finally {
      isStartingRef.current = false;
      setScannerLoading(false);
    }
  };

  const handleUploadClick = () => {
    setLocalError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLocalError("");
      setScannerLoading(true);

      const imageScanner = new Html5Qrcode(SCANNER_ID);
      const decodedText = await imageScanner.scanFile(file, true);
      await imageScanner.clear();

      await onDetected(decodedText);
    } catch {
      setLocalError("Could not detect a QR code from this image.");
    } finally {
      setScannerLoading(false);
      e.target.value = "";
    }
  };

  return (
    <AppModal open={open} onClose={onClose} title="Scan QR code" maxWidth="max-w-xl">
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.20),_transparent_60%)]">
            {!cameraOpen && (
              <>
                <div className="aspect-[4/3] w-full" />
                <div className="pointer-events-none absolute inset-5 rounded-[24px] border-2 border-white/80" />
                <div className="pointer-events-none absolute left-5 right-5 top-10 h-1 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.9)] animate-pulse" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold">Scan restaurant QR</p>
                    <p className="mt-1 text-sm text-white/70">
                      Use camera or upload a QR image
                    </p>
                  </div>
                </div>
              </>
            )}

            <div
              id={SCANNER_ID}
              className={`${cameraOpen ? "block min-h-[320px] w-full overflow-hidden rounded-[24px]" : "hidden"}`}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleOpenCamera}
            disabled={loading || scannerLoading}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
          >
            {scannerLoading && cameraOpen ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening camera...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                Open Camera
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleUploadClick}
            disabled={loading || scannerLoading}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <ImageUp className="h-4 w-4" />
            Upload Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {(error || localError) && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}
      </div>
    </AppModal>
  );
}