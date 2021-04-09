import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  heading = "Thêm sản phẩm";
  subheading = "Để thêm mới sản phẩm vui lòng click create new";
  icon = "pe-7s-magic-wand icon-gradient bg-mixed-hopes";
  link="/admin/add-product";

  products: Array<any> =[];

  constructor(
    private route: Router,
    private productService: ProductService,

  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAll().subscribe(res =>{
      this.products = res.data;
    })
  }

  remove(id){
    let conf = confirm("Bạn chắc chắn xóa");
    if(conf){
      this.productService.removeByid(id).subscribe(data=>{
        this.getAllProducts();
         this.route.navigate(['/admin/product-list']);
      })
    }
  }
}
