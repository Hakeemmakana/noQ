

import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { TableFormValues, tableStatustoBack } from "../types/tableTypes";
const frontentUrl = window.location.origin
// const frontentUrl = 'http://localhost:4001'


export const tableService = {
    async getTable(searchVal = "", page = 1) {
        try {
            const res = await adminApi.get(`/${ADMIN_ROUTE}/table`, {
                params: { page, searchVal },
            });
            return {
                ...res?.data.data,
                data: res?.data.data.data.map((item: { [key: string]: unknown }) => ({
                    ...item,
                    qrValue: `${frontentUrl}/tables/${res?.data.data.hotelId}/${item.id}`
                }))
            }
        } catch (error) {
            throw(getErrorMessage(error))
        }
    },

    async addTable(data: TableFormValues) {
        try {
            const res = await adminApi.post(`/${ADMIN_ROUTE}/table`, data);
            return res?.data.data;
        } catch (error) {
             throw(getErrorMessage(error))
        }
    },

    async editTable(id: string, data: TableFormValues) {
        try {
            const res = await adminApi.put(`/${ADMIN_ROUTE}/table/${id}`, data);
            return res.data.data;
        } catch (error) {
             throw(getErrorMessage(error))
        }
    },

    async deleteTable(id: string) {
        try {
            const res = await adminApi.delete(`/admin/table/${id}`);
            return res.data;
        } catch (error) {
             throw(getErrorMessage(error))
        }
    },

    async changeStatus(id: string, status: tableStatustoBack) {
        try {
            const res = await adminApi.patch(`/admin/table/${id}`, {
                status,
            });
            return res.data;
        } catch (error) {
             throw(getErrorMessage(error))
        }
    },
};