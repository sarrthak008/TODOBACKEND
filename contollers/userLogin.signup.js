import user from "../models/user.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"


///REGSITER USER HERE

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        //check email is already exist.

        const emialIsExist = await user.findOne({ email });
        if (emialIsExist) {
            return res.json({
                message: 'email is already exist',
            }).status(400)
        }

        //hash the password...
        const salt = await bcrypt.genSalt(10);;
        const hashPass = await bcrypt.hash(password, salt);

        //create a new user and save it into db..

        const newUser = new user({
            name,
            email,
            password: hashPass
        })

        await newUser.save()    

        if (newUser) {
            res.json({
                success: true,
                message: 'account create successfully'
            }).status(200)
        } else {
            res.json({
                success: false,
                message: 'something went wrong'
            }).status(400)
        }


    } catch (error) {
        // console.log(error)
        return res.json({
            message: "some thing went wrong",
            success: false,
        }).status(404)
    }
}


//LOGIN USER HERE



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const getUser = await user.findOne({ email });
        if (!getUser) {
            return res.json({
                message: 'please check credentials',
                success: false
            }).status(400)
        }

        // check the password is correct or not...

        const isPassMatch = await bcrypt.compare(password, getUser.password);
        if (!isPassMatch) {
            return res.json({
                message: 'please check credentials',
                success: false
            }).status(400)
        }

        // create a JWT token...

        const accessToken = JWT.sign({
            userID: getUser._id,
            username: getUser.name,
            email:getUser.email,
            role: getUser.role
        }, process.env.JWT_SERECT_TOKEN, { expiresIn: '1y' }
        )
        
        res.json({
            success:true,
            message:"login successfully.",
            token:accessToken
        }).status(200)

    } catch (error) {
        //console.log(error)
        return res.json({
            message: "some thing went wrong",
            success: false,
        }).status(404)
    }
}

export { register, login }