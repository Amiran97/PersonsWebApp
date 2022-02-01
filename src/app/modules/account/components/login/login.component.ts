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
        username: new FormControl(null, [
          Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z]{1}(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{5,31}$')]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8), 
          Validators.maxLength(32),
          Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,32}$')]),
      });
     }

  onSubmit() {
    if(this.loginForm.valid) {
      this.accountFacade.login(this.loginForm.value).subscribe(
        account => {
          this.router.navigate(['/persons']);
        },
        error => {
          if(error.status == 400) {
            this.loginForm.setErrors({'auth': 'Login or password not correct!'})
          }
        }
      );
    }
  }
}