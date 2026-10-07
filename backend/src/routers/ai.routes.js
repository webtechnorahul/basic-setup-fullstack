import { Router } from "express";
import { identifyUser } from "../middleware/auth.middleware.js";
import { chatWithAi } from "../controllers/ai.controller.js";

const aiRoutes=Router();



aiRoutes.post('/chat',identifyUser,chatWithAi);

export default aiRoutes