import db from "../models/index"
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log("--------------------");
        console.log(data);
        console.log("--------------------");

        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message);
    console.log(req.body);
    return res.send('post crud form server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log("-------------------------------");
    // console.log(data);
    console.log("-------------------------------");

    return res.render("displayCRUD.ejs", {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        // console.log(userData);
        // check  user data not found
        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {
        return res.send('User not found')

    }
}

let putCRUD = async (req, res) => {
    let data = req.body

    let allUsers = await CRUDService.updateUserData(data)
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteCRUDById(id)
        return res.send("delete the successed!")
    } else {
        return res.send("user not found")
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}