import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  heading = "Thêm sản phẩm";
  subheading = "Để thêm mới sản phẩm mới vui lòng click create new";
  icon = "pe-7s-magic-wand icon-gradient bg-mixed-hopes";
  link="/admin/add-product";

  title = "Add Form";

  cates: Array<Category> = [];

  productForm = new FormGroup({

  })
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.getCates();
  }

  getCates(){
    let num = [1,100];
    this.categoryService.getAll(num).subscribe(res =>{
      this.cates = res.data;
    })
  }

}
