import { AuthGuard } from './auth.guard';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login/login.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    SegurancaRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthGuard]
})
export class SegurancaModule { }
