import express from "express"
import hometController from "../controller/homeController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", hometController.getHomePage);

    router.get("/quyngo", (req, res) => {
        return res.send('QuyNgo is number 1')
    });
    router.get("/crud", hometController.getCRUD)


    return app.use("/", router)
}

module.exports = initWebRoutes;