import express from "express"
import hometController from "../controller/homeController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", hometController.getHomePage)
    router.get("/crud", hometController.getCRUD)

    router.post("/post-crud", hometController.postCRUD)
    router.get("/get-crud", hometController.displayGetCRUD)
    router.get("/edit-crud", hometController.getEditCRUD)
    router.post('/put-crud', hometController.putCRUD)
    router.get('/delete-crud', hometController.deleteCRUD)

    return app.use("/", router)
}

module.exports = initWebRoutes;