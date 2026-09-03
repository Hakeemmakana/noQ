import React from "react";
import AppShell from "../components/AppShell";
import { waiterNavItems } from "./waiterNav";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { Navigate } from "react-router-dom";

const WaiterLayout: React.FC = () => {
   const staffRole=useSelector(
    (state:RootState)=>state.staffAuth.role)
    if(!staffRole){
      return <Navigate to="/auth/staffLogin" replace />;
    }
    if(staffRole=='cheff'){
      return <Navigate to="/staff/cheff" replace />;
    }
  return <AppShell roleTitle="Waiter" navItems={waiterNavItems} />;
};

export default WaiterLayout;