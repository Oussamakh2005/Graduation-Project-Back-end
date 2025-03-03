import express from "express";
import { PORT } from "./env.js";
import router from "./routes/main.js";
const app = express();
app.use(express.json());
app.get('/test', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "app is work well"
    });
});
app.use('/api', router);
app.listen(PORT, (err) => {
    err ? console.log("something went worng") : console.log(`application run on port : ${PORT}`);
});
export default app;
//# sourceMappingURL=app.js.map