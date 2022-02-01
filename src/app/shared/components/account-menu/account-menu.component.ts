import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {

  constructor(public accountFacade: AccountFacadeService,
    private router: Router) {
  }

  onLogoutClick() {
    this.accountFacade.logout().subscribe();
    this.router.navigate(['/account/login']);
  }
}
