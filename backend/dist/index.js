"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cohere_1 = require("./service/cohere");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3030;
(0, cohere_1.init_cohere)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Welcome to my AI Translator API!');
});
app.get('/gt', (req, res) => {
    console.log('Hola que al');
    const { toLanguage, value } = req.query;
    if (!toLanguage || !value) {
        res.send({
            error: true,
            msg: 'Some data is missing',
            data: ''
        });
        return;
    }
    if (value.length > 300) {
        res.send({
            error: true,
            msg: '300 characters maximum',
            data: ''
        });
        return;
    }
    (0, cohere_1.getTranslation)(toLanguage, value).then((value) => res.send({ error: false, msg: 'OK', data: value }));
});
app.listen(port, () => {
    console.log(`App listening at port -> ${port}`);
});
