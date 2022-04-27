import * as express from "express";
import * as cors from "cors";
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", function (req, res) {
    console.log(req.body)
    res.json({
        estado: "ok",
    });
});

app.listen(PORT, () => {
    console.log("Todo funcionando en el puerto " + PORT);
});
