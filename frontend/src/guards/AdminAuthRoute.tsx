import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import  type {RootState} from "../app/store";

interface Props {
  children: ReactNode;
}

export default function AdminAuthRoute({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.adminAuth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/admin/" replace />;
  }

  return <>{children}</>;
}