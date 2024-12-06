import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export function Notification({
  message,
  type,
  duration = 3000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <div className="flex items-center justify-between">
            <p>{message}</p>
            <button onClick={() => setIsVisible(false)} className="ml-4">
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
