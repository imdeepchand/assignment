import { Router } from "express";
import UsersController from "../controllers/users.controller"
export const user_router = Router();

user_router.post("/add-user",UsersController.saveUser)
user_router.get("/users",UsersController.userList)
user_router.get("/user/:id", UsersController.userById)
user_router.put("/edit-user/:id", UsersController.updateUser)
user_router.delete("/delete-user/:id", UsersController.deleteUser)

