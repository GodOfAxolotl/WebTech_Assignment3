// content-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService, ApiItem } from '../data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // <-- Import für DomSanitizer

@Component({
  selector: 'app-content-list',
  template: `
  <ul>
    <li *ngFor="let item of filteredItems">
      <div>
        <h3>{{ item.name }}</h3>
        <div [innerHTML]="sanitizeHtml(item.stringValue)"></div>
      </div>
    </li>
  </ul>
  `,
  styles: [`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
  }

  li {
    border: 1px solid #ccc;
    padding: 15px;
  }
`]
})
export class ContentListComponent implements OnInit {
  items: ApiItem[] = [];
  filteredItems: ApiItem[] = []; // <-- Neues Array für gefilterte Elemente

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.dataService.getMashupData().subscribe(items => {
      this.items = items;
      this.filteredItems = this.items.filter(item => item.type === "data:content" && item.stringValue != "");
    });
  }

  sanitizeHtml(html: string): SafeHtml { // <-- Methode zum Sanitize von HTML
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
