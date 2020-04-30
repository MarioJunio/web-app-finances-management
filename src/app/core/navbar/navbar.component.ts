import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  sidenav;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  renovarToken(): void {
    this.authService.renovarLogin();
  }

}
