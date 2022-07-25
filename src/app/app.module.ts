import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    NgbNavModule,
    NgSelectModule,
    NgxPaginationModule
  ],
  providers: [AppService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
