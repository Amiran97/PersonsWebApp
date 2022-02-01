import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmValidator } from 'src/app/core/validators/confirm.validator';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirmation() { return this.registerForm.get('passwordConfirmation'); }

  constructor(
    private accountFacade: AccountFacadeService,
    private router: Router) { 
      this.registerForm = new FormGroup({
        username: new FormControl(null, [
          Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z]{1}(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{5,31}$')
        ]),
        email: new FormControl(null, [
          Validators.email, Validators.required, 
          Validators.minLength(6), 
          Validators.maxLength(100)
        ]),
        password: new FormControl(null, [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(32),
          Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,32}$')
        ]),
        passwordConfirmation: new FormControl(null, [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(32),
          Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{8,32}$')
        ]),
      }, {
        validators: [ConfirmValidator.sameValues('password', 'passwordConfirmation')],
        updateOn: 'change'
      });
    }

  onSubmit() {
    if(this.registerForm.valid) {
      this.accountFacade.register(this.registerForm.value).subscribe(
        () => {
          this.router.navigate(['account/login']);
        },
        error => {
          if(error.status == 400) {
            this.registerForm.setErrors({'register': `User name ${this.username?.value} is already taken`})
          }
        }
      );
    }
  }
}
