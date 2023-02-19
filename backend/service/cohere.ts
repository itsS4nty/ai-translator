import cohere from "cohere-ai";

export const init_cohere = () => {
    cohere.init(process.env.COHERE_API_KEY ?? '');
}

export const getTranslation = async (toLanguage: string, value: string) => {
    const response = await cohere.generate({
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
    const match = text.match(/"(.*)"/);

    return match ? match[1] : text;
}

const getPrompt = (language: string, value: string) => {
    language ??= 'en';
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
