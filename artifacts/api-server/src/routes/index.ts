import { Router, type IRouter } from "express";
import healthRouter from "./health";
import techCareRouter from "./tech-care";

const router: IRouter = Router();

router.use(healthRouter);
router.use(techCareRouter);

export default router;
