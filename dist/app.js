import express from "express";
import { PORT } from "./env.js";
const app = express();
app.use(express.json());
app.get('/test', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "app is work well"
    });
});
app.listen(PORT, (err) => {
    err ? console.log("something went worng") : console.log(`application run on port : ${PORT}`);
});
//# sourceMappingURL=app.js.map