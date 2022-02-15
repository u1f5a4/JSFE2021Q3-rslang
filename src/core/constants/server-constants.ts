export const domain = 'https://rslang-words.herokuapp.com';

export interface IBearer {
  bearer: string;
}

export const BEARER: IBearer = {
  bearer: `Bearer ${JSON.parse(localStorage.getItem('user')!)}`,
};

export const STATE = {
  auth: JSON.parse(localStorage.getItem('user')!),
  userName: JSON.parse(localStorage.getItem('user')!),
};
