import React from "react";
import clsx from "clsx";

export function Button({ children, onClick, variant = "outline", ...props }) {
  const base = "px-4 py-2 rounded text-sm font-semibold transition";

  const styles = {
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
    success: "bg-green-500 text-white hover:bg-green-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} className={clsx(base, styles[variant])} {...props}>
      {children}
    </button>
  );
}
