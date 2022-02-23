const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const Role = require("../models/roleModel");
const { promisify } = require("util");


const signJWT = (userId) => {
    return JWT.sign({ id: userId }, process.env.JWT_WEB_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createAndSendToken = (user, res) => {
    var token = signJWT(user.id);
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        secure: process.env.NODE_ENV === "development" ? false : true, //this will only valid for HTTPS connection
        httpOnly: process.env.NODE_ENV === "development" ? false : true, //transfer only in http/https protocols
    });
    res.status(200).json({
        success: true,
        status: "success",
        token: token,
        data: {
            user,
        },
    });
};

exports.signup = async (req, res, next) => {
    try {
        // validate if roleId is valid
        var role = await Role.findOne({
            _id : req.body.role
        })
        if(!role){
            return res.status(404).json({
                status: "error",
                error: "please provide valid role.",
            });
        }
        var user = await User.create(req.body); // bson
        // return obj
        var profileUser = {
            username: user.username,
            email: user.email,
            id: user.id
        }

        createAndSendToken(profileUser, res)
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.signin = async (req, res, next) => {
    try {
        var { email, password } = req.body;
        //check if user & email exits
        if (!email || !password) {
            return res.status(404).json({
                status: "error",
                error: "please provide email & password",
            });
        }
        //fetch user whose email is given
        var user = await User.findOne({ email }).populate({
            path: "role",
            select: "type name allowedApps",
            model: Role
        })
        //verify password
        //enceptyed ps === password
        var passwordVerified = await user.passwordVerification(
            password,
            user.password
        );

        if (!passwordVerified || !user) {
            return res.status(401).json({
                status: "error",
                error: "invalid email or password",
            });
        }
        var userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
            email: user.email,
            isActive: user.isActive,
            id: user._id,
            role: user.role
        };
        createAndSendToken(userProfile, res);

    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.protect = async (req, res, next) => {
    try {
        // TODO: check token for verification
        var token = null;
        // 1- fetch token from request header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer") // authorization: Bearer {token}
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        // 2- check if token exits
        if (!token) {
            return res.status(401).json({
                error: "please sign in!",
            });
        }
        // 3- verify
        var { id: userId, iat: tokenIssuedAt } = await promisify(JWT.verify)(
            token,
            process.env.JWT_WEB_SECRET
        ); //converting callback function to async await method (promise)
        // 4- check if user exist in DB
        var user = await User.findById(userId).select("+password");
        if (!user) {
            return res.status(401).json({
                error: "user belonging to this token does not exist!",
            });
        }
        // 5- check if user doesnt change password after signing token
        var passwordChangedAt = user.passwordChangedAt;
        if (passwordChangedAt) {
            var isPasswordChangedAfter =
                passwordChangedAt.getTime() > tokenIssuedAt * 1000;
            if (isPasswordChangedAfter) {
                return res.status(401).json({
                    error: "password has been changed, please login again!",
                });
            }
        }
        // 6 : set user
        if (!user) {
            return res.status(401).json({
                status: "error",
                error: "User does not exist",
            });
        }
        
        var userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
            email: user.email,
            isActive: user.isActive,
            id: user._id,
            role: user.role
        };

        req.body.user = userProfile
        next()
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.validateUser = async (req,res,next)=>{
    try {
        var role = await Role.findOne({
            _id : req.body.user.role,
            type: process.env.MASTER_USER
        })

        if(!role){
            return res.status(401).json({
                status: "error",
                error: "You are not authorized add more users.",
            });   
        }
        next()
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }   
}