import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware";
import { addDocs, deleteDocs, getADocs, getDocs, updateDocs } from "../controllers/docsController";
import { addDiscipline, getDiscipline } from "../controllers/disciplineController";

const router = express.Router()
router.post("/adddocs", protectRoute,addDocs)
router.post("/adddiscipline", protectRoute,addDiscipline)
router.get("/getdiscipline", protectRoute,getDiscipline);
router.put("/updatedocs", protectRoute,updateDocs)
router.get("/getdocs", protectRoute,getDocs);
router.get("/getadocs", protectRoute,getADocs);
router.delete("/deletedocs",protectRoute,deleteDocs)
export default router;