import { db } from "../models/index"
import { ApplicationController } from "./Application.controller";

class UserController extends ApplicationController {
    constructor() {
        super(db.UsersSchema);
    }
}
export const UserControllers = new UserController();

