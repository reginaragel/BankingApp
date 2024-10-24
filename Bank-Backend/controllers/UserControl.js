const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const salt=bcrypt.genSaltSync(10);
const secret='rahel4635wfsdt46373635q3df3g425';



const UserControl = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'User not registered, Sign up' });
            }

            // Compare passwords
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Server Error' });
                }

                if (result) {
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        secret, 
                        { expiresIn: '1h' }
                    );

                    // Only send the response once
                    return res.status(200).json({ message: 'User Signed In', token });
                } else {
                    return res.status(400).json({ message: 'Invalid Password' });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error occurred while logging in' });
        }
    },
    signup: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const user = await User.create({
                username,
                email,
                password: bcrypt.hashSync(password, salt),
            });
            return res.status(201).json({ message: 'User Registered Successfully' });
        } catch (err) {
            console.error("Error while registering the user", err);
            return res.status(500).json({ error: 'Error while registering the user' });
        }
    },
   logout:async(req,res)=>{
     
   }
};

module.exports=UserControl