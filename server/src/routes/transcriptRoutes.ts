import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware";
import { addTranscript, deleteTranscript, getAdminPerformanceStats, getPerformanceStats, getTData, updateTranscript } from "../controllers/transcriptController";

const router = express.Router()

router.post("/addtranscript", protectRoute,addTranscript);
router.get("/gettranscript", protectRoute,getTData);
router.get("/getperfstats", protectRoute,getPerformanceStats);
router.get("/getadminperfstats/:userId", protectRoute,getAdminPerformanceStats);
router.put("/updatetranscript",protectRoute,updateTranscript)
router.delete("/deletetranscript",protectRoute,deleteTranscript)
//getPerformanceStats 

export default router;