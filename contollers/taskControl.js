import Task from "../models/task.js"
import user from "../models/user.js"
import JWT from "jsonwebtoken"

const addtask = async (req, res) => {
    try {

        //getting the user email to add data in database...
        const { token } = req.body;
        const { email } = JWT.verify(token, process.env.JWT_SERECT_TOKEN)

        const getUser = await user.findOne({ email });

        if (!getUser) {
            return res.json({
                message: 'some thing went wrong',
                success: false
            }).status(400)
        }

        const { title, description, category, isComplete } = req.body

        const newTask = new Task({
            title,
            description,
            category,
            isComplete
        })
        await newTask.save()
        await getUser.tasks.push(newTask._id);
        await getUser.save()

        res.json({
            message: 'task added successfully',
            success: true,
            data: newTask
        }).status(200)


    } catch (error) {
        res.json({
            message: error.message,
            success: false,
        }).status(400)
    }


}


//getting task usssing JWT id....
const gettask = async (req, res) => {

    try {
        const { token } = req.query;

        if (!token) {
            return res.json({
                message: 'token not found',
                success: false,
            }).status(400)
        }
        const { email } = JWT.verify(token, process.env.JWT_SERECT_TOKEN)
        const data = await user.findOne({ email }).populate('tasks', '-__v');
        res.json({
            message: 'data fetched successfully',
            data: data.tasks,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false,
        }).status(400)
    }
}


const deleteTask = async (req, res) => {
    try {
        const { token } = req.body
        const decode = JWT.verify(token, process.env.JWT_SERECT_TOKEN);
        if (!decode) {
            return res.json({
                message: 'something went wrong',
                success: false
            }).status(401)
        }
        const { _id } = req.body
        if (!_id) {
            return res.json({
                message: 'something went wrong',
                success: false
            }).status(401)
        }
        const deletedTask = await Task.findOneAndDelete({ _id })
        if (!deletedTask) {
            return res.json({
                message: 'task not found..',
                success: false
            }).status(404)
        }
        res.json({
            message: 'task delete successfully.',
            success: true,
            data: deletedTask
        }).status(200)


    } catch (error) {
        res.json({
            message: error.message,
            success: false
        }).status(401)
    }
}

export { addtask, gettask, deleteTask }