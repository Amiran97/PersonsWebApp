import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TokenInterceptorService } from './modules/account/services/token-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	  BrowserAnimationsModule,
	  ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-rigth',
      
    }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
