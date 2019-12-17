import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
  ],
  imports: [
    LayoutModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
