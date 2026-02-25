import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export type TourStep = {
  id: string;
  selector: string;
  title: string;
  body: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function getTargetRect(selector: string): DOMRect | null {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return null;
  return el.getBoundingClientRect();
}

export function TourOverlay({
  open,
  steps,
  stepIndex,
  onStepIndex,
  onClose,
}: {
  open: boolean;
  steps: TourStep[];
  stepIndex: number;
  onStepIndex: (n: number) => void;
  onClose: () => void;
}) {
  const step = steps[stepIndex];

  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!open) return;
    const update = () => setRect(getTargetRect(step.selector));
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, step?.selector]);

  // Focus management: keep keyboard in the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStepIndex(Math.min(steps.length - 1, stepIndex + 1));
      if (e.key === "ArrowLeft") onStepIndex(Math.max(0, stepIndex - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onStepIndex, stepIndex, steps.length]);

  const popoverStyle = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(380, vw - 24);

    if (!rect) {
      return {
        width,
        left: (vw - width) / 2,
        top: 24,
      } as const;
    }

    const gap = 14;
    const preferredTop = rect.bottom + gap;
    const altTop = rect.top - gap;

    const top = preferredTop + 220 < vh ? preferredTop : Math.max(24, altTop - 220);
    const left = clamp(rect.left + rect.width / 2 - width / 2, 12, vw - width - 12);

    return { width, left, top } as const;
  }, [rect, stepIndex, open]);

  const highlightStyle = useMemo(() => {
    if (!rect) return null;
    const pad = 6;
    return {
      left: rect.left - pad,
      top: rect.top - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
    } as const;
  }, [rect]);

  const hasTarget = !!rect;
  const isLast = stepIndex === steps.length - 1;

  return (
    <AnimatePresence>
      {open && step && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/55" onClick={onClose} />

          {/* Highlight box */}
          {highlightStyle && (
            <motion.div
              className="absolute rounded-xl border border-white/40"
              style={highlightStyle}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 rounded-xl" style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)" }} />
            </motion.div>
          )}

          {/* Popover */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={step.title}
            className="absolute ui-surface bg-white/95 backdrop-blur p-4"
            style={popoverStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="ui-label text-muted-foreground">Step {stepIndex + 1} / {steps.length}</div>
                <h3 className="mt-2 text-lg font-heading font-semibold text-foreground">{step.title}</h3>
              </div>
              <Button variant="ghost" size="icon-sm" className="rounded-full" onClick={onClose} aria-label="Close tour">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.body}</p>

            {!hasTarget && (
              <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-2">
                This step’s target isn’t visible. Try switching tool tabs, then continue.
              </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                className="rounded-md"
                onClick={() => onStepIndex(Math.max(0, stepIndex - 1))}
                disabled={stepIndex === 0}
              >
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="rounded-md" onClick={onClose}>
                  Skip
                </Button>
                <Button className="rounded-md" onClick={() => (isLast ? onClose() : onStepIndex(stepIndex + 1))}>
                  {isLast ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function usePersistentTour(key: string) {
  const [seen, setSeen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  });

  const markSeen = () => {
    setSeen(true);
    try {
      localStorage.setItem(key, "1");
    } catch {
      // ignore
    }
  };

  const reset = () => {
    setSeen(false);
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  };

  return { seen, markSeen, reset };
}
