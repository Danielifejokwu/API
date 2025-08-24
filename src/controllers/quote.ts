import { Request, Response } from "express";
import { getQuote } from "../utils/helpers";

const getSingleQuote = (req: Request, res: Response) => {
  try {
    const quote = getQuote();
    res.status(200).json({ quote });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quote", error });
  }
};

const QuoteController = {
  getSingleQuote,

}

export default QuoteController;