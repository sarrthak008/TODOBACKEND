import { Router } from "express";
const taskRouter = Router();
import { addtask ,gettask} from "../contollers/taskControl.js";

taskRouter.post('/addtask', addtask);
taskRouter.get('/gettask',gettask)

export default taskRouter;
