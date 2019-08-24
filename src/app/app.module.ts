import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports:      [
                AppRoutingModule,
                BrowserModule, 
                FormsModule, 
                ReactiveFormsModule, 
                HttpClientModule,
                BrowserAnimationsModule, 
                MaterialModule
                ],
  declarations: [ AppComponent, SitesComponent, DashboardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
