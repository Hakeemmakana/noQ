
import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type {
  StaffFormData,
  StaffStatus,
} from "../types/staffTypes";
export const getStaff = async (searchVal = "", page = 1) => {
  try {
    const res = await adminApi.get(`/${ADMIN_ROUTE}/staff`, {
      params: {
        page,
        searchVal,
      },
    });

    return res?.data.data;
  } catch (error) {
     throw(getErrorMessage(error))
  }
};

export const addStaff = async (data: StaffFormData) => {
  try {
    const res = await adminApi.post(`/${ADMIN_ROUTE}/staff`, data);
    return res?.data.data;
  } catch (error) {
     throw(getErrorMessage(error))
  }
};

export const editStaff = async (id: string, data: StaffFormData) => {
  try {
    const res = await adminApi.put(
      `/${ADMIN_ROUTE}/staff/${id}`,
      data
    );
    return res.data.data;
  } catch (error) {
    throw(getErrorMessage(error))
  }
};

export const deleteStaff = async (id: string) => {
  try {
    const res = await adminApi.delete(
      `/${ADMIN_ROUTE}/staff/${id}`
    );
    return res.data;
  } catch (error) {
     throw(getErrorMessage(error))
  }
};

export const changeStaffStatus = async (
  id: string,
  status: StaffStatus
) => {
  try {
    const res = await adminApi.patch(
      `/${ADMIN_ROUTE}/staff/${id}`,
      {
        status,
      }
    );
    return res.data;
  } catch (error) {
     throw(getErrorMessage(error))
  }
};