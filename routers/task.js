import { Router } from "express";
const taskRouter = Router();
import { addtask } from "../contollers/taskControl.js";

taskRouter.post('/:email/add', addtask);

export default taskRouter;
