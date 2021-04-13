import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product-cate',
  templateUrl: './list-product-cate.component.html',
  styleUrls: ['./list-product-cate.component.css']
})
export class ListProductCateComponent implements OnInit {

  cates: Array<any> = [];
  cate: Category = {
    id: null,
    name: "",
    image: "",
    products:[],

  };
  constructor(
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllCates();

    this.activeRoute.paramMap.subscribe(params =>{
      let cateId = params.get('cateId');
      if (cateId) {
        this.categoryService.getCateById(Number(cateId)).subscribe(data => {
          this.cate = data;
          console.log(this.cate);
        })
      }
    })

  }

  getAllCates(){
    this.categoryService.getAllCates().subscribe(data=>{
      this.cates = data;
    })
  }

}
