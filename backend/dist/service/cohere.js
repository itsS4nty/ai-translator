"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslation = exports.init_cohere = void 0;
const cohere_ai_1 = __importDefault(require("cohere-ai"));
const init_cohere = () => {
    var _a;
    cohere_ai_1.default.init((_a = process.env.COHERE_API_KEY) !== null && _a !== void 0 ? _a : '');
};
exports.init_cohere = init_cohere;
const getTranslation = (toLanguage, value) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(value);
    const response = yield cohere_ai_1.default.generate({
        model: 'xlarge',
        prompt: getPrompt(toLanguage, value),
        max_tokens: 300,
        temperature: 0.3,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likelihoods: 'NONE',
    });
    const { text } = response.body.generations[0];
    console.log(text);
    const match = text.match(/"(.*)"/);
    return match ? match[1] : text;
});
exports.getTranslation = getTranslation;
const getPrompt = (language, value) => {
    language !== null && language !== void 0 ? language : (language = 'en');
    const prompt_values = {
        de: {
            first_value: 'Mein Name ist Santy',
            second_value: 'Mein Auto ist dunkel mattgrau',
            third_value: 'Wie spät ist es?',
        },
        fr: {
            first_value: 'Mon nom est Santy',
            second_value: 'Ma voiture est gris foncé mat',
            third_value: 'Quelle heure est-il?',
        },
        it: {
            first_value: 'Il mio nome è Santy',
            second_value: 'La mia auto è di colore grigio scuro opaco',
            third_value: 'Che ore sono?',
        },
        en: {
            first_value: 'My name is Santy',
            second_value: 'My car is dark matt grey',
            third_value: 'What time is it?',
        },
        es: {
            first_value: 'Mi nombre es Santy',
            second_value: 'Mi coche es de color gris oscuro mate',
            third_value: '¿Qué hora es?',
        },
    };
    return `This is a text translator.
    --
    Input sample: "Me llamo Santy"
    Output sample: "${prompt_values[language].first_value}"
    --
    Input sample: "Mi coche es de color gris oscuro mate"
    Output sample: "${prompt_values[language].second_value}"
    --
    Input sample: "¿Que hora es?"
    Output sample: "${prompt_values[language].third_value}"
    --
    Input sample: "${value}"
    Output sample:`;
};
