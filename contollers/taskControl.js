import Task from "../models/task.js"
import user from "../models/user.js"

const addtask = async (req, res) => {
    try {

        //getting the user email to add data in database...
        const email = req.params.email
        console.log(email)
        const getUser = await user.findOne({ email });

        if (!getUser) {
            return res.json({
                message: 'some thing went wrong',
                success: false
            }).status(400)
        }

        const { title, description, completeBefore, isComplete } = req.body
        const newTask = new Task({
            title,
            description,
            completeBefore,
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
        console.log(error)
    }





}

export { addtask }