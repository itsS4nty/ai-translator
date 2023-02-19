import { COHERE_API_KEY } from '../API_KEY';
const COHERE_API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language';
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate';

export const getLanguage = async (value: string) => {
    const data = {
        texts: [value],
    };

    const { results } = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            'Cohere-Version': '2022-12-06',
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

    const [{ language_code }] = results;
    return language_code;
};

export const translateText = async (value: string, toLanguage: string): Promise<string> => {
    const data = {
        model: 'xlarge',
        prompt: getPrompt(toLanguage, value),
        max_tokens: 40,
        temperature: 0.3,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likelihoods: 'NONE',
    };

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            'Cohere-Version': '2022-12-06',
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());

    const { text } = response.generations[0];

    const match = text.match(/"(.*)"/);

    return match ? match[1] : text;
};

const getPrompt = (language: string, value: string) => {
    language ??= 'en';
    console.log(language)
    const prompt_values: any = {
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
