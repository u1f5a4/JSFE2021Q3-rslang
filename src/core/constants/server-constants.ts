export const domain = 'http://localhost:5000';

export interface IBearer {
  bearer: string;
}

export const BEARER: IBearer = {
  bearer: `Bearer ${JSON.parse(localStorage.getItem('user')!)}`,
};