import mongoose, { Schema } from "mongoose";

export interface IMenuVariant {
    _id?: mongoose.Types.ObjectId;
    name: string;                 // Full, Half, 250ml, Large
    image?: string;
    price: number;
    stock?: number;               // Used only for PER_VARIANT
    stockFactor?: number;         // Used only for SHARED
    status: "available" | "out_of_stock";
    nutrition?: {
        servingSize?: string;
        calories?: number;
        protein?: number;
        carbohydrates?: number;
        fat?: number;
        fiber?: number;
        sugar?: number;
        sodium?: number;
    };
}
const NutritionSchema = new Schema(
    {
        servingSize: { type: String, default: "" }, // e.g. 100g, 250ml
        calories: { type: Number, default: 0 },     // kcal
        protein: { type: Number, default: 0 },      // g
        carbohydrates: { type: Number, default: 0 },// g
        fat: { type: Number, default: 0 },          // g
        fiber: { type: Number, default: 0 },        // g
        sugar: { type: Number, default: 0 },        // g
        sodium: { type: Number, default: 0 },       // mg
    },
    { _id: false }
);
const MenuVariantSchema = new Schema<IMenuVariant>({
    name: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    stockFactor: { type: Number, default: 1 },
    status: {
        type: String,
        enum: ["available", "out_of_stock"],
        default: "available"
    },
     nutrition: {
        type: NutritionSchema,
        default: () => ({}),
    },
});
export default MenuVariantSchema