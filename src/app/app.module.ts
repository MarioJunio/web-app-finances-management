import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
