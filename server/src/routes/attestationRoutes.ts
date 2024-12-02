import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware";
import { addAttestation, addRequest, deleteAllAttestation, deleteAttestation, downloadAttestation, getAdminAttestData, getAttData, updateAttestation } from "../controllers/attestationController";

const router = express.Router()
router.post("/addattestation", protectRoute,addAttestation);
router.post("/addrequest", protectRoute,addRequest);
router.put("/updateattestation", protectRoute,updateAttestation);
router.get("/getattestation", protectRoute,getAttData);
router.get("/getadminattestation", protectRoute,isAdminRoute,getAdminAttestData);
router.delete("/deleteattestation",protectRoute,deleteAttestation)
router.delete("/deleteallattestation",protectRoute,deleteAllAttestation)
router.get("/downloadattest/:id", downloadAttestation);
export default router;