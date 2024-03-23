import express from 'express';
import cors from "cors";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.CORS_ALLOWS_ORIGIN,
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

app.use(express.json());
require("./src/routes/index")(app);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
