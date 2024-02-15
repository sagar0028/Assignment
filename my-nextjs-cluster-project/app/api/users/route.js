const database = require("../../../database/index.js") //"@/database";
const {wrapError} = require("../../../helper/router-helpers")
const Users = require("../../../database/models/User.js")

async function getAllUsers(req) {
    try {
       
        const user = await Users.find();
        if (user?.length < 0 || !user) {
            return {code: 404, message: "Data Not Found"}
        }
        return {code: 200, message: "Success", payload: user}
    } catch (error) {
        console.log(error);
        return {code: 500, message: "Internal Server Error"}
    }
}

async function registerNewUser(req) {
    
    const body = await req.json();
    const username = body.username ? body.username : "new_user";
    const country = body.country ? body.country : "IND";
    // const validPhone = await isValidPhone(body.phone_number);
    // const validMail = await isValidEmail(body.email);
    // if (!validPhone && !validMail) {
    //     return {code: 400, message: "Please enter valid details"}
    // }

    const contest = new Users({
        username: username,
        age: body?.age,
        hobbies: body.hobbies,
        email: body.email,
        phone_number: body.phone_number,
        country: country
    });
    await contest.save();
    return {code: 200, message: "Success", payload: contest}
}

export const GET = wrapError(getAllUsers)
export const POST = wrapError(registerNewUser)
