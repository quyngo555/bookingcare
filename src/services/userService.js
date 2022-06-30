import db from "../models/index"
import bcrypt from 'bcryptjs'
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errorCode = 0
                        userData.errorMsg = 'ok'
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errorCode = 3
                        userData.errorMsg = 'Wrong password'
                    }
                } else {
                    userData.errorCode = 2;
                    userData.errorMsg = `User isn't not found`
                }
            } else {
                userData.errorCode = 1
                userData.errorMsg = 'Your Email is not exist!'

            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,

}