import { Router } from "express";
const taskRouter = Router();
import { addtask ,gettask} from "../contollers/taskControl.js";

taskRouter.post('/:email/add', addtask);
taskRouter.get('/:email/gettask',gettask)

export default taskRouter;
