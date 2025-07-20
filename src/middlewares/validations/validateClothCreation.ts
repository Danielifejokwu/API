import { Request, Response, NextFunction } from "express";
import ClothModel, { Cloth } from "../../models/cloth";

const { getListOfClothes } = ClothModel;

const validateClothCreation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, brand, size } = req.body;
    // check req fields
    const requiredFields: (keyof Cloth)[] = ['name', 'size', 'color', 'price', 'brand', 'category'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`

      });
    }

    const allClothes = await getListOfClothes();
    const exists = allClothes.some(
      ( c: { name: string; brand: string; size: string; }) =>
        c.name.toLowerCase() === name.toLowerCase() &&
        c.brand.toLowerCase() === brand.toLowerCase() &&
        c.size.toLowerCase() === size.toLowerCase()
    );

    if (exists) {
      res.status(400).json({ message: "Cloth already exists" });
    }

    next();
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal validation error" });
  }
};

export default validateClothCreation;
