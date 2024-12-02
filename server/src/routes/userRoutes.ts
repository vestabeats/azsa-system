import express from "express";
import { registerUser,loginUser,logOutUser, getStudents, updateUserProfile, activateUserProfile, deleteUserProfile, deleteRestoreUser, adminChangeUserPassword, getUser, sideBarData, getUserStatsByYear, getAllUserHistory, changeUserPassword, getAttache, changeConduct, getConduct, getOfficials } from "../controllers/userController";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware";
import { getNotificationsList, markNotificationRead } from "../controllers/attestationController";

const router = express.Router()

router.post("/register", registerUser);
router.post("/login",loginUser)
router.post("/logout",logOutUser)
router.get("/getstudents", getStudents)
router.put("/updateprofile",  updateUserProfile);
router.put("/admchangepassword",  isAdminRoute, adminChangeUserPassword);
router.put("/changepassword",  changeUserPassword);
router.get("/find/:id", getUser)
router.get("/sidebardata",sideBarData)
router.get("/studentstats",   getUserStatsByYear)
router.get("/history", getAllUserHistory);
router.get("/notifications", getNotificationsList);
router.put("/read-noti",  markNotificationRead);
router.get("/getattache",  getAttache);
router.get("/getofficials",  getOfficials);
router.get("/getconduct", , getConduct);
router.put("/changeconduct",  isAdminRoute, changeConduct);
router.delete(
  "/delete-restore/:id?",
  protectRoute, isAdminRoute,
  deleteRestoreUser
);
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router
