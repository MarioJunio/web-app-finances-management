import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router) {
    this.toastyConfig.theme = 'material';
  }

  ngOnInit(): void {
  }

  get isLogin(): boolean {
    return this.router.url === '/login';
  }

}
