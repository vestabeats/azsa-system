import express from "express";
import { registerUser,loginUser,logOutUser, getStudents, updateUserProfile, activateUserProfile, deleteUserProfile, deleteRestoreUser, adminChangeUserPassword, getUser, sideBarData, getUserStatsByYear, getAllUserHistory, changeUserPassword, getAttache, changeConduct, getConduct, getOfficials } from "../controllers/userController";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware";
import { getNotificationsList, markNotificationRead } from "../controllers/attestationController";

const router = express.Router()

router.post("/register", protectRoute,registerUser);
router.post("/login",loginUser)
router.post("/logout",logOutUser)
router.get("/getstudents", protectRoute,getStudents)
router.put("/updateprofile", protectRoute, updateUserProfile);
router.put("/admchangepassword", protectRoute, isAdminRoute, adminChangeUserPassword);
router.put("/changepassword", protectRoute, changeUserPassword);
router.get("/find/:id",protectRoute, getUser)
router.get("/sidebardata",protectRoute, sideBarData)
router.get("/studentstats", protectRoute,  getUserStatsByYear)
router.get("/history",protectRoute, getAllUserHistory);
router.get("/notifications", protectRoute, getNotificationsList);
router.put("/read-noti", protectRoute, markNotificationRead);
router.get("/getattache", protectRoute, getAttache);
router.get("/getofficials", protectRoute, getOfficials);
router.get("/getconduct", protectRoute, getConduct);
router.put("/changeconduct", protectRoute, isAdminRoute, changeConduct);
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