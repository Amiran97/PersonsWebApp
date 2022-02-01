import { Component } from '@angular/core';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public accountFacade: AccountFacadeService) { }

}
