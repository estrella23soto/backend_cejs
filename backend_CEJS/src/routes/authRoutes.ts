import { Router,RouterOptions } from "express";
 class Authroutes{
    public router:Router;

    constructor(){
        this.router =Router();
        this.config();
    }

    config(){

    }
 }

 const  authroutes = new  Authroutes();
 export default  authroutes.router;