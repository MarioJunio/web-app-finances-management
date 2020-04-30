import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(): void {

    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }

}
