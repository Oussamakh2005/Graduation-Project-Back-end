import express from "express";
import { PORT } from "./env.js";
import router from "./routes/main.js";
import cors from "cors";
import { errorResponse } from "./middlewares/errorHandler.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*"
}));
app.get('/test', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "app is work well"
    });
});
app.use('/api', router);
app.use(errorResponse);
app.listen(PORT, (err) => {
    err ? console.log("something went worng") : console.log(`application run on port : ${PORT}`);
});
export default app;
