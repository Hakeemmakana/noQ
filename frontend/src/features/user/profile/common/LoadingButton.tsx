// src/components/common/LoadingButton.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export default function LoadingButton({
  children,
  loading = false,
  loadingText = "Loading...",
  variant = "primary",
  fullWidth = false,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      variant={variant}
      fullWidth={fullWidth}
      disabled={loading || props.disabled}
    >
      {loading ? loadingText : children}
    </Button>
  );
}