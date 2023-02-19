import { GetTranslationResponse } from "../types/getTranslation";

const GET_TRANSLATION = '/gt';
const apiUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

export const translateText = async (
    toLanguage: string,
    value: string
): Promise<GetTranslationResponse> => await fetch(`${apiUrl}${GET_TRANSLATION}?toLanguage=${toLanguage}&value=${value}`).then((res) => res.json());
