import { Router } from "express";
const taskRouter = Router();
import { addtask ,gettask ,deleteTask} from "../contollers/taskControl.js";

taskRouter.post('/addtask', addtask);
taskRouter.get('/gettask',gettask)
taskRouter.delete('/deletetask',deleteTask)


export default taskRouter;
