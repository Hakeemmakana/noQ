import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import  type {RootState} from "../app/store";

interface Props {
  children: ReactNode;
}

export default function UserAuthRoute({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}