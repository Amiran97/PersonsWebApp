import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { PersonsRoutingModule } from './persons-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
    
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PersonsModule { }
