import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.toastr.error("Incorrect page!");
    this.router.navigate(['/persons']);
  }

}
