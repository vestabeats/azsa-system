import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware";
import { addAcademics, deleteAcademics, downloadFile, getAData, getProgData, updateAcademics } from "../controllers/academics";

const router = express.Router()

router.post("/addacademics", protectRoute,addAcademics);
router.get("/getacademics", protectRoute,getAData);
router.get("/getprogdata/:program", protectRoute,getProgData);
router.put("/updateacademics",protectRoute,updateAcademics)
router.delete("/deleteacademics",protectRoute,deleteAcademics)
router.get("/downloadfile/:id", downloadFile);

export default router;