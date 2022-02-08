import { BEARER } from '../../core/constants/server-constants';
import { AuthResponse } from '../../models/response/AuthResponse';
import AuthModel from './AuthModel';
import AuthView from './AuthView';
import ErrorContainer from './components/error-container';

class AuthController {
  userData!: AuthResponse;

  errorContainer!: ErrorContainer;

  errorBlock!: ErrorContainer;

  constructor(public view: AuthView, public model: AuthModel) {
    this.submitForm();
    this.login();
    this.view.onClick = () => {
      this.model.getUsers(this.userData.userId);
    };
  }

  displayPage() {
    this.view.drawPage();
  }

  submitForm() {
    this.view.formAuth.onSubmit = async (user) => {
      this.model.registrationUser(user).then((response) => {
        if (response.status === 422) {
          response.json().then((data: any) => {
            this.errorBlock = new ErrorContainer(
              this.view.formAuth.titleBlock.node,
              data.error.errors
            );
          });
        }
        if (response.status === 417) {
          response.text().then((err: string) => {
            this.errorBlock = new ErrorContainer(
              this.view.formAuth.titleBlock.node,
              '',
              err
            );
          });
        } else {
          this.errorBlock.destroy();
        }
      });
      this.errorBlock.destroy();
      this.submitForm();
    };
  }

  login() {
    this.view.formAuth.onLogin = async (user) => {
      this.userData = await this.model.loginUser(user);
      localStorage.setItem('token', this.userData.token);
      BEARER.bearer = `Bearer ${this.userData.token}`;
      this.view.userName = this.userData.name;
    };
  }
}

export default AuthController;
