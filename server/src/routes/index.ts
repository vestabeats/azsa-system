import express from "express";
import userRoutes from "./userRoutes"
import attestationRoutes from "./attestationRoutes"
import transcriptRoutes from "./transcriptRoutes"
import chatRoutes from "./chatRoutes"
import docsRoutes from "./docsRoutes"
import academicsRoutes from "./academicsRoutes"

const router = express.Router()

router.use("/user",userRoutes)
router.use("/attestation",attestationRoutes)
router.use("/transcript",transcriptRoutes)
router.use("/chat",chatRoutes)
router.use("/academics",academicsRoutes)
router.use("/docs",docsRoutes)



export default router