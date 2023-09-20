
interface FlagData {
    png: string;
    svg: string;
    alt: string;
}

interface NameData {
    common: string;
    official: string;
    nativeName: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
}

interface CurrencyData {
    name: string;
    symbol: string;
}

interface LanguageData {
    [key: string]: string;
}

interface CountryData {
    flags: FlagData;
    name: NameData;
    currencies: {
        [key: string]: CurrencyData;
    };
    capital: string[];
    languages: LanguageData;
    area: number;
    population: number;
    timezones: string[];
}
