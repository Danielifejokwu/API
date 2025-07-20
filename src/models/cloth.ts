import mongoose from "mongoose";

export interface Cloth {
  id?: number;
  name: string;
  size: string;
  color?: string;
  price?: number;
  brand: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const clothSchema = new mongoose.Schema<Cloth>({
  name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const clothDbModel = mongoose.model<Cloth>('cloth', clothSchema);
const getListOfClothes = async () => {
  const cloths = await clothDbModel.find();
  return cloths.map((cloth) => ({
    id: cloth._id,
    name: cloth.name,
    size: cloth.size,
    color: cloth.color,
    price: cloth.price,
    brand: cloth.brand,
    category: cloth.category,
    createdAt: cloth.createdAt,
    updatedAt: cloth.updatedAt,

  }));
}



const createClothData = async (cloth: Cloth) => {
  const newcloth = new clothDbModel({...cloth, name: cloth.name!.toLowerCase() });
  await newcloth.save();

  const { _id, name, color, price, brand, category } = newcloth;
  return {
    id: _id,
    name,
    color,
    price,
    brand,
    category
  };
}


const getById = async (id: string) => {
  const user = await clothDbModel.findById(id);
  const { _id, name, createdAt, updatedAt } = user || {};

  return {
    id: _id,
    name,

    createdAt,
    updatedAt,
  };
}


const updateClothData = async (id: number, data: Partial<Cloth>) => {
  const cloth = await clothDbModel.find({id});
  if (cloth) {
    Object.assign(cloth, data);
    return cloth;
  }
  return null
}

const deleteClothData = async (id: number) => {
  const cloth = await clothDbModel.deleteOne({id});
  return cloth.acknowledged
}


const ClothModel = {
  getListOfClothes,
  createClothData,
  getById,
  deleteClothData,
  updateClothData,


};



export default ClothModel;