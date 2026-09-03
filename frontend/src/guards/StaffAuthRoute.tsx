import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import  type {RootState} from "../app/store";

interface Props {
  children: ReactNode;
}

export default function StaffAuthRoute({ children }: Props) {
  const role = useSelector(
    (state: RootState) => state.staffAuth.role
  );

  if (role=='waiter') {
    return <Navigate to="/staff/waiter" replace />;
}else if(role=='chef'){
      return <Navigate to="/staff/chef" replace />;

  }

  return <>{children}</>;
}