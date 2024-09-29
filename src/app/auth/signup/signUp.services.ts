import axiosClient from '@/lib/axios';
import axios from 'axios';

interface Country {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes?: string[];
  };
}

interface FormattedCountry {
  name: string;
  callingCode: string;
}

export const signUp = async (User: object) => {
  return await axiosClient.post('/register/', User)
}


export const fetchCountries = async (): Promise<FormattedCountry[]> => {
  try {
    const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
    if (response.status === 200) {
      const data = response.data;

      return data.map((country): FormattedCountry => ({
        name: country.name.common,
        callingCode: country.idd ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes.join(', ') : '') : ''
      }));
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

export const fetchTimezone = async () => {
  return axios.get('https://worldtimeapi.org/api/timezone');
}
