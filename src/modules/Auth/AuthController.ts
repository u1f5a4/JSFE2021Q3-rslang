import { BEARER } from '../../core/constants/server-constants';
import { AuthResponse } from '../../models/response/AuthResponse';
import { IUser } from '../../models/user-model';
import AppModel from '../AppModel';
import HomeController from '../Home/HomeController';
import HomeView from '../Home/HomeView';
import AuthModel from './AuthModel';
import AuthView from './AuthView';
import ErrorContainer from './components/error-container';
import SignInForm from './components/signin-form';
import SignUpForm from './components/signup-form';

class AuthController {
  private userData!: any;

  public signInForm!: SignInForm;

  public signUpForm!: SignUpForm;

  public errorBlock!: ErrorContainer;

  constructor(public view: AuthView, public model: AuthModel) {
    this.registrationUser(this.view.formContainer.formAuth);
    this.toggleAuthModal();
    this.view.onClick = () => {
      this.model.getUsers(this.userData.content.userId);
    };
  }

  public displayPage(): void {
    this.view.drawPage();
  }

  private async registrationUser(elem: SignUpForm): Promise<void> {
    elem.onSubmit = async (user: IUser) => {
      const response = await this.model.registrationUser(user);
      this.renderError(response)    
      if(response.ok) {
        response.json().then((data: IUser) => {
            this.view.formContainer.formHeader.node.innerHTML = `<h2>Добро пожаловать, ${data.name}!</h2>`
            this.view.formContainer.formAuth.destroy()
            this.signInForm = new SignInForm(this.view.formContainer.node)
            this.login(this.signInForm)
          }) 
      }
      this.clearErrorBlok()
    };
  } 

  private clearErrorBlok(): void {
    if (this.errorBlock) {
      this.errorBlock.destroy();
    }
  }

  public async loginHandler(user: IUser): Promise<void> {
    const response = await this.model.loginUser(user)
    this.renderError(response)
    if (response.ok) {
        //this.userData = response.json()
        const content: AuthResponse = await response.json();
        localStorage.setItem('user', JSON.stringify(content));
        BEARER.bearer = `Bearer ${content.token}`;
        this.view.destroy();
        const home = new HomeController(new HomeView(), new AppModel());
        home.displayPage();
      };
      this.clearErrorBlok()
  }

  public login(elem: SignInForm): void {
    elem.onLogin = async (user) => {
      this.loginHandler(user);
    };
  }

  private toggleAuthModal(): void {
    this.view.formContainer.onToggleIn = () => {
      this.view.formContainer.formAuth.destroy();
      this.signInForm = new SignInForm(this.view.formContainer.node);
      this.login(this.signInForm);
      this.clearErrorBlok()
    };
    this.view.formContainer.onToggleUp = () => {
      this.signInForm.destroy();
      this.view.formContainer.formAuth = new SignUpForm(
        this.view.formContainer.node
      );
      this.registrationUser(this.view.formContainer.formAuth);
      this.clearErrorBlok()
    };
  }

  public renderError(response: Response): void {  
    const error = response.text()
    response.json()
    .catch((e: any) => {
      error.then((err: any) => {
        if(response.status === 422) {
          this.errorBlock = new ErrorContainer(
            this.view.formContainer.formHeader.node,
            JSON.parse(err).error.errors
          )
        } else {
          this.errorBlock = new ErrorContainer(
            this.view.formContainer.formHeader.node,
            '',
            err
          )
        }
        }) 
  }) 
}
}

export default AuthController;
