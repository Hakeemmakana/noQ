import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type{
  CategoryFormData,
  CategoryStatus,
} from "../types/categoryTypes";




export const categoryService = {
  async getUser(searchVal = "", page = 1) {
         try {
        const res= await adminApi.get(`/${ADMIN_ROUTE}/category`,{
            params:{
                page,
                searchVal
            }
        })
        return res?.data.data
        
    } catch (error) {
        throw (getErrorMessage(error))
    }
  },

  async addcatogory(data:CategoryFormData){
    try {
        const res= await adminApi.post(`/${ADMIN_ROUTE}/category`,data)
        return res?.data.data
        
    } catch (error) {
        throw (getErrorMessage(error))
    }

  },

  async editcategory(id: string, data: CategoryFormData) {
     try {
        const res= await adminApi.put(`/${ADMIN_ROUTE}/category/${id}`,data)
        return res.data.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
  },

  async delete(id: string) {
     try {
        const res= await adminApi.delete(`/admin/category/${id}`)
        return res.data
    } catch (error) {
        throw (getErrorMessage(error))
    }

  },

  async changeStatus(id: string, status: CategoryStatus) {
     try {
        const res= await adminApi.patch(`/admin/category/${id}`,{
            status:status
        })
        return res.data
    } catch (error) {
        throw (getErrorMessage(error))
    }

  },
};

