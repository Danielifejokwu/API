// routes/api/clothes.routes.ts

import express from "express";
import ClothesController from "../../controllers/cloth";
import  validateClothCreation  from "../../middlewares/validations/validateClothCreation";

const router = express.Router();

router.get("/", ClothesController.getClothes);
router.post("/",validateClothCreation, ClothesController.createCloth);
router.get("/:id", ClothesController.getClothById);
router.put("/:id", ClothesController.updateCloth);
router.delete("/:id", ClothesController.deleteCloth);

export default router;
