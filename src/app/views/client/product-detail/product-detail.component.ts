import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  imgUrl = '';

  product: Product = {
    id: null,
    name: "",
    image:"",
    cate_id: null,
    price: null,
    sale_price: null,
    short_desc: "",
    content: "",
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params =>{
      let proId = params.get('proId');
      if (proId) {
        this.productService.findById(Number(proId)).subscribe(data => {
          this.product = data;
          this.imgUrl = this.product.image;
        })
      }
    })
  }

  changeImgUrl(imgUrl){
    this.imgUrl = imgUrl;
  }

}
