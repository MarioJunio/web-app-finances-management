import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message-validate',
  templateUrl: './message-validate.component.html',
  styleUrls: ['./message-validate.component.css']
})
export class MessageValidateComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() message: string;

  hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
