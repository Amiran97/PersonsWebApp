import { Component } from '@angular/core';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';
import { Person } from '../../models/person';
import { PersonsFacadeService } from '../../services/persons-facade.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  personToDelete?: string;

  constructor(
    public personsFacade: PersonsFacadeService,
    public accountFacade: AccountFacadeService) { }

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
}
