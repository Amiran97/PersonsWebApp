import { Component } from '@angular/core';
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
    public personsFacade: PersonsFacadeService) { }

  onDeleteClick(id: string) {
    this.personToDelete = id;
  }

  onModalClosed() {
    if(this.personToDelete)
    {
      this.personsFacade.remove(this.personToDelete).subscribe();
      this.personToDelete = undefined;
    }
  }
}
