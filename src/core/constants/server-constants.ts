export const domain = 'https://rslang-words.herokuapp.com';

export interface IBearer {
  bearer: string;
}

export const BEARER: IBearer = {
  bearer: `Bearer ${
    JSON.parse(localStorage.getItem('rslang-localStorage') as string)
      ? JSON.parse(localStorage.getItem('rslang-localStorage')!).token
      : null
  }`,
};

export const STATE = {
  auth: JSON.parse(localStorage.getItem('rslang-localStorage')!),
  userName: JSON.parse(localStorage.getItem('rslang-localStorage')!),
};
