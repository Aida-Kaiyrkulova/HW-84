import express from "express";
import * as mongoose from "mongoose";
import mongoDb from "./mongoDb";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const run = async () => {
    await mongoose.connect('mongodb://localhost/');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));