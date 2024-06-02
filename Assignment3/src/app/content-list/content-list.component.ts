import { Component, OnInit } from '@angular/core';
import { DataService, ApiItem } from '../data.service';

@Component({
  selector: 'app-content-list',
  template: `
    <ul>
      <li *ngFor="let item of items">{{item.ident}}: {{item.name}}</li>
    </ul>
  `,
  styles: []
})
export class ContentListComponent implements OnInit {
  items: ApiItem[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getMashupData().subscribe(items => this.items = items);
  }
}
