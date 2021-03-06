import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person';
import { PersonsFacadeService } from '../../services/persons-facade.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  id: string = '';
  isAddMode: boolean = false;
  personForm: FormGroup;

  constructor(
    private personsFacade: PersonsFacadeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.personForm = new FormGroup({
      firstName: new FormControl(null, {
        validators: [
          Validators.required, 
          Validators.maxLength(60),
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z]{3,60}$')
        ]
      }),
      lastName: new FormControl(null, {
        validators: [
          Validators.required, 
          Validators.maxLength(60),
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z]{3,60}$')
        ]
      }),
      phoneNumber: new FormControl(null, {
        validators: [
          Validators.pattern('^0[0-9]{9}$'), 
          Validators.required, 
          Validators.maxLength(10),
          Validators.minLength(10)]
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required, 
          Validators.email, 
          Validators.maxLength(100),
          Validators.minLength(6)
        ]
      }),
      birthday: new FormControl(null, {
        validators: [Validators.required]
      })
    });
   }

  get firstName() { return this.personForm.get('firstName'); }
  get lastName() { return this.personForm.get('lastName'); }
  get phoneNumber() { return this.personForm.get('phoneNumber'); }
  get email() { return this.personForm.get('phoneNumber'); }
  get birthday() { return this.personForm.get('birthday'); }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.personsFacade.gerById(this.id).subscribe(data => {
        this.personForm.patchValue(data);
        this.birthday?.setValue(formatDate(data.birthday, 'yyyy-MM-dd', 'en'));
      }); 
    }
    else{
      this.birthday?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    }
  }

  onSubmit() {
    if(this.personForm.valid) {
      let formPerson = this.personForm.value as Person;
      if(this.isAddMode) {
        this.personsFacade.create(formPerson).subscribe(
          persons => this.router.navigate(['/persons'])
          );
      }
      else {
        formPerson.id = this.id;
        this.personsFacade.update(this.id, formPerson).subscribe(
          persons => this.router.navigate(['/persons'])
          );
      }
    }
  }

  onPhoneKeyPress(event: KeyboardEvent) {
    if(!event.code.match('Digit') || (this.phoneNumber?.value as string)?.length >= 10) {
      event.preventDefault();
    }
  }

  onBackClick() {
    this.location.back();
  }

}
