import renderHeaderTemplate from '../../Components/Header/renderHeaderTemplate';
import { BEARER, STATE } from '../../core/constants/server-constants';
import { AuthResponse } from '../../models/response/AuthResponse';
import { IUser } from '../../models/user-model';
import AuthModel from './AuthModel';
import AuthView from './AuthView';
import ErrorContainer from './components/error-container';
import SignInForm from './components/signin-form';
import SignUpForm from './components/signup-form';

class AuthController {
  private userData!: AuthResponse;

  public signInForm!: SignInForm;

  public signUpForm!: SignUpForm;

  public errorBlock!: ErrorContainer;

  constructor(public view: AuthView, public model: AuthModel) {
    this.registrationUser(this.view.formContainer.formAuth);
    this.toggleAuthModal();
  }

  public displayPage(): void {
    this.view.drawPage();
    const loginBtn = document.getElementById('login') as HTMLButtonElement;
    if (loginBtn) {
      loginBtn.disabled = true;
    }
  }

  private async registrationUser(elem: SignUpForm): Promise<void> {
    const singUpFormButton = elem;
    singUpFormButton.onSubmit = async (user: IUser) => {
      const response = await this.model.registrationUser(user);
      if (!response.ok) {
        this.renderError(response);
      }
      if (response.ok) {
        response.json().then((data: IUser) => {
          this.view.formContainer.formHeader.node.innerHTML = `<h2>Добро пожаловать, ${data.name}!</h2>`;
          this.view.formContainer.formAuth.destroy();
          this.signInForm = new SignInForm(this.view.formContainer.node);
          this.login(this.signInForm);
        });
      }
      this.clearErrorBlok();
    };
  }

  private clearErrorBlok(): void {
    if (this.errorBlock) {
      this.errorBlock.destroy();
    }
  }

  public async loginHandler(user: IUser): Promise<void> {
    const response = await this.model.loginUser(user);
    if (!response.ok) {
      this.renderError(response);
    }
    if (response.ok) {
      this.userData = await response.json();
      localStorage.setItem('user', JSON.stringify(this.userData));
      BEARER.bearer = `Bearer ${this.userData.token}`;
      STATE.auth = JSON.parse(localStorage.getItem('user')!);
      STATE.userName = JSON.parse(localStorage.getItem('user')!);
      window.location.replace('http://localhost:8080');
      renderHeaderTemplate();
    }
    this.clearErrorBlok();
  }

  public login(elem: SignInForm): void {
    const signInFormButton = elem;
    signInFormButton.onLogin = async (user) => {
      this.loginHandler(user);
    };
  }

  private toggleAuthModal(): void {
    this.view.formContainer.onToggleIn = () => {
      this.view.formContainer.formAuth.destroy();
      this.signInForm = new SignInForm(this.view.formContainer.node);
      this.login(this.signInForm);
      this.clearErrorBlok();
    };
    this.view.formContainer.onToggleUp = () => {
      this.signInForm.destroy();
      this.view.formContainer.formAuth = new SignUpForm(
        this.view.formContainer.node
      );
      this.registrationUser(this.view.formContainer.formAuth);
      this.clearErrorBlok();
    };
  }

  public renderError(response: Response): void {
    const error = response.text();
    response.json().catch(() => {
      error.then((err: any) => {
        if (response.status === 422) {
          this.errorBlock = new ErrorContainer(
            this.view.formContainer.formHeader.node,
            JSON.parse(err).error.errors
          );
        } else {
          this.errorBlock = new ErrorContainer(
            this.view.formContainer.formHeader.node,
            '',
            err
          );
        }
      });
    });
  }
}

export default AuthController;
