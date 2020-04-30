import { Directive, HostBinding, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFormPesquisa]'
})

export class FormPesquisaDirective implements OnInit {

  @HostBinding('style.border') border: String;
  @HostBinding('style.borderRadius') borderRadius: String;
  @HostBinding('style.padding') padding: String;
  @HostBinding('style.backgroundColor') backgroundColor: String;

  @Input("corBorda") corBorda: String;

  ngOnInit() {
    this.border = '2px solid #E0E0E0';
    this.borderRadius = '4px';
    this.padding = '10px';
    this.backgroundColor = '#eee';
  }

  @HostListener('mouseover') mouseEntrou() {
    this.border = '2px solid ' + this.corBorda;
  }

  @HostListener('mouseleave') mouseSaiu() {
    this.border = '2px solid #E0E0E0';
  }

}
