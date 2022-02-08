import { BEARER, domain } from '../../core/constants/server-constants';
import { AuthResponse } from '../../models/response/AuthResponse';
import { IUser } from '../../models/user-model';

class AuthModel {
  user = {} as IUser;

  isAuth = false;

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: any) {
    this.user = user;
  }

  public async registrationUser(user: IUser): Promise<any> {
    return fetch(`${domain}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public async loginUser(user: IUser): Promise<AuthResponse> {
    const response = await fetch(`${domain}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content: AuthResponse = await response.json();
    localStorage.setItem('token', JSON.stringify(content.token));
    this.setAuth(true);
    // this.setUser(content.name)
    // this.setUser(content)
    return content;
  }

  public async checkAuth(id: string) {
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

  public async getUsers(id: string) {
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
