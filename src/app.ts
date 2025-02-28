import express , {Request , Response} from "express";
import { PORT } from "./env.js";
//setup new express app :
const app = express();
//use express.json middleware :
app.use(express.json());
//create a test route :
app.get('/test',(req : Request , res : Response) => {
    res.status(200).json({
        ok : true ,
        msg : "app is work well"
    });
});
//bind express app to port
app.listen(PORT,(err) => {
    err? console.log("something went worng") : console.log(`application run on port : ${PORT}`);
});
