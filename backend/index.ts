import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTranslation, init_cohere } from './service/cohere';
import { getTranslationType } from './types/Request';

dotenv.config();

const app = express();
const port = 3030;

init_cohere();

app.use(cors({
    origin: ['http://localhost:3000', 'https://ai-translator.santy-dev.com/'],
    optionsSuccessStatus: 200,
}));

app.get('/', (req, res) => {
    res.send('Welcome to my AI Translator API!');
});

app.get('/gt', (req: Request<{}, {}, {}, getTranslationType>, res: Response) => {
    const { toLanguage, value } = req.query;
    if (!toLanguage || !value) {
        res.send({
            error: true,
            msg: 'Some data is missing',
            data: ''
        });
        return;
    }
    getTranslation(toLanguage, value).then((value) =>
        res.send({ error: false, msg: 'OK', data: value })
    );
});

app.listen(port, () => {
    console.log(`App listening at port -> ${port}`);
});
