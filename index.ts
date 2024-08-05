import express from "express";

const app = express();
const port = 8000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});