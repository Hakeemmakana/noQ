import React from "react";
import AppShell from "../components/AppShell";
import { chefNavItems } from "./chefNav";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { Navigate } from "react-router-dom";

const ChefLayout: React.FC = () => {
  const staffRole=useSelector(
    (state:RootState)=>state.staffAuth.role)
    if(!staffRole){
      return <Navigate to="/auth/staffLogin" replace />;
    }
    if(staffRole=='waiter'){
      return <Navigate to="/staff/waiter" replace />;
    }
  return <AppShell roleTitle="Chef" navItems={chefNavItems} />;
};

export default ChefLayout;