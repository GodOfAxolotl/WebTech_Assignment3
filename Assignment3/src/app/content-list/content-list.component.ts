// content-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService, ApiItem } from '../data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // <-- Import für DomSanitizer

@Component({
  selector: 'app-content-list',
  template: `
    <ul>
      <li *ngFor="let item of filteredItems"> 
      {{item.ident}}: {{item.name}} 
      <div [innerHTML]="sanitizeHtml(item.stringValue)"></div>
      </li>
    </ul>
  `,
  styles: []
})
export class ContentListComponent implements OnInit {
  items: ApiItem[] = [];
  filteredItems: ApiItem[] = []; // <-- Neues Array für gefilterte Elemente

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.dataService.getMashupData().subscribe(items => {
      this.items = items;
      this.filteredItems = this.items.filter(item => item.type === "data:content");
    });
  }

  sanitizeHtml(html: string): SafeHtml { // <-- Methode zum Sanitize von HTML
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
