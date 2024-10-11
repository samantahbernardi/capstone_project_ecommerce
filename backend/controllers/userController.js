import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Non è presente nessun nome utente con questa e-mail ... per ora." })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'e-mail/password incorretti' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route per registrazione utente
const userSignup = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // controllare se esiste già un account
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Esiste già un account associato a questa e-mail" })
        }

        // validazione e-mail e password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Inserisci un indirizzo e-mail valido" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Inserisci una password più efficace" })
        }

        // hashing password utente
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route per login admin
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Email/Password non validi"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { userLogin, userSignup, adminLogin }