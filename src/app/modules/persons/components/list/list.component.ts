import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';
import { Person } from '../../models/person';
import { PersonsFacadeService } from '../../services/persons-facade.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  personCollection: Array<Person> = new Array<Person>();
  personToDelete?: string;
  page: number = 1;
  isLoading: boolean = true;
  firstNameAsc: boolean = true;
  lastNameAsc: boolean = true;
  phoneNumberAsc: boolean = true;
  emailAsc: boolean = true;
  birthdayAsc: boolean = true;
  modifyDateAsc: boolean = true;

  constructor(
    public personsFacade: PersonsFacadeService,
    public accountFacade: AccountFacadeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.retrievePersons();
    let pParam = this.route.snapshot.paramMap.get('p');
    if(pParam) {
      this.page = Number(pParam);
    }
  }

  onDeleteClick(id: string) {
    this.personToDelete = id;
  }

  onModalClosed() {
    if(this.personToDelete && this.accountFacade.isAuthenticated())
    {
      this.personsFacade.remove(this.personToDelete).subscribe();
      this.personToDelete = undefined;
    }
  }

  private retrievePersons() {
    this.isLoading = true;
    this.personsFacade.persons$.subscribe(data => {
      this.personCollection = data;
      this.isLoading = false;
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.router.navigate(['/persons/page/', event]);
  }

  handlePageSizeChange(event: any): void {
    this.page = 1;
    this.retrievePersons();
  }

  onHeadClick(fieldName: string)
  {
    if(fieldName == 'modifyDate') {
      this.personCollection.sort((a : any, b : any) => 
        (formatDate(a[fieldName], 'yyyy.MM.dd hh:mm:ss', 'en') > formatDate(b[fieldName], 'yyyy.MM.dd hh:mm:ss', 'en')) ? -1 : 1);
    }
    if((this as any)[fieldName + 'Asc']) {
      this.personCollection.sort((a : any, b : any)=> (a[fieldName] > b[fieldName]) ? -1 : 1);
    }
    else {
      this.personCollection.sort((a : any, b : any)=> (a[fieldName] < b[fieldName]) ? -1 : 1);
    }
    (this as any)[fieldName + 'Asc'] = !(this as any)[fieldName + 'Asc'];
  }
}
