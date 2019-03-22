import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pepole-app',
  template: `<app-sidenav></app-sidenav>`,
  styles: []
})
export class PepoleAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('baseline-more_vert', sanitizer
    .bypassSecurityTrustResourceUrl('/assets/dots-vertical.svg'));
    iconRegistry.addSvgIcon('baseline-menu', sanitizer
    .bypassSecurityTrustResourceUrl('/assets/menu.svg'));    
  }

  ngOnInit() {
  }

}
