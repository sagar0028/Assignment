const { wrapError } = require("../../../../helper/router-helpers");
const Users = require("../../../../database/models/User")

async function getUserById(req, context) {
    try {
        if (!context?.params?.user_id)
            return { code: 404, message: "User id not found ", payload: null };

        const userId = context.params.user_id;

        const user = await Users.findById(userId);

        if (!user) {
            return { code: 404, message: "User Not Found", payload: user };
        }
        return { code: 200, message: "Success", payload: user };
    } catch (error) {
        console.log(error);
        return { code: 500, message: "Internal Server Error" };
    }
}

async function updateUserById(req, context) {
    try {
        if (!context?.params?.user_id)
            return { code: 404, message: "User id not found ", payload: null };

        const userId = context.params.user_id;
        const updates = await req.json();
        const user = await Users.findOneAndUpdate(
            { _id: userId },
            {
                username: updates?.username,
                age: updates?.age,
                hobbies: updates?.hobbies,
                email: updates?.email,
                phone_number: updates?.phone_number,
                country: updates?.country
            },
            { new: true }
        );
        if (!user) {
            return { code: 404, message: "User Not Found", payload: user };
        }
        return { code: 200, message: "Success", payload: user };
    } catch (error) {
        console.log(error);
        return { code: 500, message: "Internal Server Error" };
    }
}

async function deleteUserById(req, context) {
    try {
        if (!context?.params?.user_id)
            return { code: 404, message: "User id not found", payload: null };

        const userId = context.params.user_id;

        const user = await Users.findByIdAndDelete(userId);

        if (!user) {
            return { code: 404, message: "User Not Found", payload: user };
        }

        return { code: 200, message: "User deleted successfully", payload: user };
    } catch (error) {
        console.error(error);
        return { code: 500, message: "Internal Server Error" };
    }
}

exports.GET = wrapError(getUserById);

exports.PUT = wrapError(updateUserById);

exports.DELETE = wrapError(deleteUserById);
