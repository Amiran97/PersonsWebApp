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
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required]),
        passwordConfirmation: new FormControl(null, [Validators.required]),
      }, {
        validators: [ConfirmValidator.sameValues('password', 'passwordConfirmation')],
        updateOn: 'change'
      });
    }

  onSubmit() {
    this.accountFacade.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['account/login']);
      },
      error => {
        if(error.status == 400) {
          this.registerForm.setErrors({'register': `User name ${this.username?.value} is already taken`})
        }
        console.error(error);
      }
    );
  }
}
