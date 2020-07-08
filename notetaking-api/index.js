import cors from "cors";
import express from "express";
import graphlHTTP from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";
import bodyParser from 'body-parser';
import path from 'path';
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/notetaking_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const PORT = 4003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dir = path.join(process.cwd(), 'images');
console.log(dir);
app.use(express.static(dir));
app.use('/images', express.static(dir));

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Notetaking API v1"
    });
});
app.use(
    "/graphql",
    graphlHTTP({
        schema: schema,
        graphiql: true
    })
);
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});