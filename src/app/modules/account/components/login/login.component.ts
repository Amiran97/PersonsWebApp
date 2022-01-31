import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private accountFacade: AccountFacadeService,
    private router: Router) {
      this.loginForm = new FormGroup({
        username: new FormControl(null, [Validators.maxLength(100), Validators.required]),
        password: new FormControl(null, [Validators.required]),
      });
     }

  onSubmit() {
    this.accountFacade.login(this.loginForm.value).subscribe(
      account => {
        this.router.navigate(['/persons']);
      },
      error => {
        if(error.status == 401) {
          this.loginForm.setErrors({'auth': 'Login or password not correct!'})
        }
      }
    );
  }
}
