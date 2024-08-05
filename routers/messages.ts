import express from "express";
import {promises as fs} from "fs";
import {MessageData} from "../types";

const messagesRouter = express.Router();
const fileMessagePath = './messages';

messagesRouter.get('/', async (_, res) => {
    try {
        const messageDataArray: MessageData[] = [];
        const files = await fs.readdir(fileMessagePath);

        if (files.length !== 0) {
            for (const file of files) {
                const fileContents = await fs.readFile(`./messages/${file}`);
                const result: MessageData = JSON.parse(fileContents.toString());
                messageDataArray.push(result);
            }
            return res.status(200).send(messageDataArray.slice(-5));
        } else {
            return res.status(400).send([]);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while reading data');
    }
});

messagesRouter.post('/', async (req, res) => {
    try {
        const postData: MessageData = {
            message: req.body.message,
            datetime: new Date().toISOString(),
        };

        if (Object.values(postData).every(value => value.trim().length > 0)) {
            const filePatch = `${fileMessagePath}/${postData.datetime}.txt`;
            await fs.writeFile(filePatch, JSON.stringify(postData));
            return res.status(200).send(postData);
        } else {
            return res.status(400).send('Invalid input');
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while sending the request');
    }
});

export default messagesRouter;