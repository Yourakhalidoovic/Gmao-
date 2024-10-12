import express from "express";
import InterventionController from "./InterventionController";

const router = express.Router();

router.get("/interventions", InterventionController.getInterventions);

export default router;
