const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const Role = require("../models/roleModel");


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
            roleId: user.role
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