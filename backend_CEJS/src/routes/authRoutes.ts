import { Router,RouterOptions } from "express";
import { authController } from "../controllers/authController";
 class Authroutes{
    public router:Router;

    constructor(){
        this.router =Router();
        this.config();
    }

    config() {
        this.router.post('/', authController.iniciarSesion);        
    }

 }

 const  authroutes = new  Authroutes();
 export default  authroutes.router;