import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { DashboardResponse, DashboardFilters } from "../types/dashboard";


function buildQueryParams(filters: DashboardFilters) {
   const params: Record<string, string> = {
    range_type: filters.type,
  };

  if (filters.type === "custom" && filters.startDate && filters.endDate) {
    params.start_date= filters.startDate;
    params.end_date= filters.endDate;
  }

  return params
}

export async function fetchDashboardData(
  filters: DashboardFilters
): Promise<DashboardResponse> {
  try {
    const params = buildQueryParams(filters);
    const res = await adminApi.get(`/${ADMIN_ROUTE}/dashboard`,{
      params,
    })
    return res.data.data
  } catch (error) {
    throw getErrorMessage(error);
  }



}

export async function exportRevenueReportCsv(
  filters: DashboardFilters
): Promise<void> {
  try {
    const params = buildQueryParams(filters);
    const res = await adminApi.get(`/${ADMIN_ROUTE}/csvReport`,{
      params,
      responseType: "blob"
    })
     // Convert response data to Blob
    const blob = new Blob(
      [res.data],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    // Create temporary URL
    const url = window.URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");

    link.href = url;
    link.download = "revenue-report.csv";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
     throw getErrorMessage(error);
  }
}

export async function exportRevenueReportPdf(
  filters: DashboardFilters
): Promise<void> {
  try {
    const params = buildQueryParams(filters);
    const res = await adminApi.get(`/${ADMIN_ROUTE}/pdfReport`,{
      params,
      responseType: "blob"
    })
    const blob = new Blob(
      [res.data],
      {
        type: "application/pdf",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "revenue-report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw getErrorMessage(error);
  }
}