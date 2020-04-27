import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MFE-POC-HOMEPAGE';

  constructor(private router: Router) {
    router.initialNavigation();
    // Manually triggering initial navigation
  }
}
