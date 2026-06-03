import { Response, NextFunction } from "express";
import { AuthRequest } from "./jwt";
import HotelAdminRepository from "../repositories/hotelAdmin/implelmentation/hotelAdminRepository";
const hotelAdminRepo=new HotelAdminRepository()
export const identifyTenant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({ success: false, message: "Hotel identifier missing" });
      return;
    }

    const hotel = await hotelAdminRepo.getHotelBySlug(slug.toString())

    if (!hotel) {
      res.status(404).json({ success: false, message: "Hotel not found" });
      return;
    }

    req.hotelId = hotel._id!.toString();
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};