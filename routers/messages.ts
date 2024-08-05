import express from "express";
import {promises as fs} from "fs";
import {MessageData} from "../types";

const messagesRouter = express.Router();
const fileMessagePath = './messages';

messagesRouter.post('/', async (req, res) => {
    try {
        const postData: MessageData = {
            message: req.body.message,
            datetime: new Date().toISOString(),
        };

        const filePatch = `${fileMessagePath}/${postData.datetime}.txt`;
        await fs.writeFile(filePatch, JSON.stringify(postData));
        return res.status(200).send(postData);

    } catch (error) {
        console.error(error);
        return res.status(500);
    }
});

export default messagesRouter;