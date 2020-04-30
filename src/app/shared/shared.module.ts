import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

import { MessageValidateComponent } from './message-validate/message-validate.component';
import { FormPesquisaDirective } from './form-pesquisa.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    MessageValidateComponent,
    ConfirmDialogComponent,
    FormPesquisaDirective
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [MessageValidateComponent, ConfirmDialogComponent, FormPesquisaDirective, MatDialogModule]
})
export class SharedModule { }
