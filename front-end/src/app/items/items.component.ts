import { Component, OnInit } from '@angular/core';
import { ItemsService } from "../services/items.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public newItem;
  public items;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.itemsService.getAll().subscribe(returnItems => {
      this.items = returnItems.docs;
    })
  }

  saveItem(): void {
    this.itemsService.create(this.newItem).subscribe( saveItem => {
      this.items.push(saveItem);
    })
  }

  deleteItem(rmItem: string, id: number): void {
    this.itemsService.delete(rmItem, id).subscribe( deleteItem => {
      this.items = this.items.filter(item => item._id != id);
    })
  }
}
