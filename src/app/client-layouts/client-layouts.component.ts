import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-client-layouts',
  templateUrl: './client-layouts.component.html',
  styleUrls: ['./client-layouts.component.css']
})
export class ClientLayoutsComponent implements OnInit {

  cates: Array<Category>;

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this.categoryService.getAllCates().subscribe(data =>{
      this.cates = data;
      console.log(this.cates);
    });
  }
}
