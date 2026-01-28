"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

export const GENERIC_ERROR_MESSAGE =
  "Something went wrong — please try again later.";

type ToastType = "error" | "success" | "warning" | "info";
type Toast = { id: number; type: ToastType; message: string };

type NotifyContextType = {
  showError: (msg: string) => void;
  showSuccess: (msg: string) => void;
  showWarning: (msg: string) => void;
  showInfo: (msg: string) => void;
};

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const t: Toast = { id, type, message };
      setToasts((s) => [t, ...s]);
      setTimeout(() => remove(id), 4200);
    },
    [remove],
  );

  const context: NotifyContextType = useMemo(
    () => ({
      showError: (m: string) => push("error", m),
      showSuccess: (m: string) => push("success", m),
      showWarning: (m: string) => push("warning", m),
      showInfo: (m: string) => push("info", m),
    }),
    [push],
  );

  return (
    <NotifyContext.Provider value={context}>
      {children}
      <div className="fixed left-0 right-0 top-[var(--navbar-height)] z-50 pointer-events-none">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center space-y-3">
            {toasts.map((t) => (
              <div
                key={t.id}
                role={t.type === "error" ? "alert" : "status"}
                className={`w-full pointer-events-auto rounded-lg p-3 text-sm flex items-start space-x-3 break-words shadow-lg ring-1 ring-black/5
                  ${t.type === "error" ? "bg-red-600 text-white" : ""}
                  ${t.type === "success" ? "bg-amber-50 text-amber-800" : ""}
                  ${t.type === "warning" ? "bg-yellow-100 text-yellow-900" : ""}
                  ${t.type === "info" ? "bg-sky-600 text-white" : ""}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {t.type === "error" && <span className="font-bold">!</span>}
                  {t.type === "success" && <span className="font-bold">✓</span>}
                  {t.type === "warning" && <span className="font-bold">⚠</span>}
                  {t.type === "info" && <span className="font-bold">i</span>}
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-0.5">
                    {t.type === "error"
                      ? "Error"
                      : t.type === "success"
                        ? "Success"
                        : t.type === "warning"
                          ? "Warning"
                          : "Info"}
                  </div>
                  <div className={`${t.type === "error" ? "text-white" : ""}`}>
                    {t.message}
                  </div>
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className={`ml-3 font-semibold opacity-90 self-start ${
                    t.type === "error" ? "text-white" : "text-gray-600"
                  }`}
                  aria-label="dismiss"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NotifyContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used within ErrorProvider");
  return ctx;
}
