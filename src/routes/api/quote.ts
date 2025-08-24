import { Router } from "express";
import QuoteController from "../../controllers/quote";

const router = Router();
const { getSingleQuote } = QuoteController;
// GET /api/v1/quote
router.get("/", getSingleQuote);

export default router;
