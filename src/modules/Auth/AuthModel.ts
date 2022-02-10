import { BEARER, domain } from '../../core/constants/server-constants';
import { AuthResponse } from '../../models/response/AuthResponse';
import { IUser } from '../../models/user-model';
import State from './components/state';

class AuthModel {
  user = {} as IUser;

  isAuth = false;
  state!: State;

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: any) {
    this.user = user;
  }


  public async registrationUser(user: IUser): Promise<Response> {
    const response = await fetch(`${domain}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response
  }

  public async loginUser(user: IUser): Promise<Response> {
    const response = await fetch(`${domain}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return response
  }

  public async checkAuth(id: string): Promise<AuthResponse> {
    const response = await fetch(`${domain}/users/${id}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: BEARER.bearer,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const content: AuthResponse = await response.json();
    return content;
  }

  public async getUsers(id: string): Promise<AuthResponse> {
    const response = await fetch(`${domain}/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: BEARER.bearer,
        Accept: 'application/json',
      },
    });
    const content: AuthResponse = await response.json();
    return content;
  }
}

export default AuthModel;
