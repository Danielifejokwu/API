import { Request, Response } from "express";
import clothModel, { Cloth } from "../models/cloth";
import ClothModel from "../models/cloth";


const { getListOfClothes, createClothData, getById, updateClothData, deleteClothData, } = ClothModel;

 const getClothes = async  (req: Request, res: Response) => {
  const cloths = await getListOfClothes();
  res.json(cloths).status(200);
};

const createCloth = async  (req: Request, res: Response) => {
  try{
    const cloth = req.body as Cloth;
    const clothData = await createClothData(cloth);
    res.status(201).json(clothData);
  } catch (error) {
    console.error("Error creating Cloth: ", error);
    res.status(500).json({message: "Internal server error"})
  }
};



export const getClothById = (req: Request, res: Response) => {
  const { id } = req.params
  const { getById } = ClothModel;
  const clothData = getById(String(id));

  if(clothData) {
    res.json(clothData).status(200);
  }else{
    res.status(400).json({message: "Cloth not found"});
  }
};

 const updateCloth = (req: Request, res: Response) => {
  const cloth = req.body as Cloth;
  const { id } = req.params
  const clothData = getById(String(id));


  if (!cloth) {
    res.status(404).json({ message: " not found" });
  } else {
    const updatedCloth = updateClothData(Number(id), cloth);
    res.json (updatedCloth).status(200)
  }
};

 const deleteCloth = async (req: Request, res: Response) => {
  const { id } = req.params
  const clothData = await getById(String(id));

  if (clothData) {
    await deleteClothData(Number(id))
    res.json(clothData).status(200);
  }else{
    res.status(400).json({ message: "Not found"})
  }


};

const ClothesController = {
  getClothes,
  createCloth,
  getClothById,
  updateCloth,
  deleteCloth,
};

export default ClothesController;
