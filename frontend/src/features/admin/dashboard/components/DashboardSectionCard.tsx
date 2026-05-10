import React from "react";

interface DashboardSectionCardProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardSectionCard: React.FC<DashboardSectionCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-[28px] border border-[#E5E7EF] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)] ${className}`}
    >
      {children}
    </div>
  );
};

export default DashboardSectionCard;