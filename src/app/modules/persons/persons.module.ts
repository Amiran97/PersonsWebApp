import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { PersonsRoutingModule } from './persons-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule
  ]
})
export class PersonsModule { }
