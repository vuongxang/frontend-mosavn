import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';
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
  totalPage = null;
  pages: Array<Number> = [];

  orderData: any[] = ORDER_DATA;

  filterObject = {
    orderBy: "1",
    keyword: "",
    pagesize: 10,
    currentPage: 1
  }

  constructor(
    private route: Router,
    private productService: ProductService,

  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAll(this.filterObject).subscribe(res =>{
      
      this.products = res.data;
      this.totalPage = res.last_page;
      if(this.pages.length==0){
        for(let i=1;i<=this.totalPage;i++) this.pages.push(i)
      }
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

  prevPage(){
    if(this.filterObject.currentPage>1){
      this.filterObject.currentPage-=1;
      this.getAllProducts();
    }
  }

  nextPage(){
    if(this.filterObject.currentPage<this.totalPage){
      this.filterObject.currentPage+=1;
      this.getAllProducts();
    }
  }

  changePageSize(event){
    this.filterObject.pagesize = event.target.value;
    this.productService.getAll(this.filterObject).subscribe(res =>{
      
      this.products = res.data;
      this.totalPage = res.last_page;
      this.pages=[];
      if(this.pages.length==0){
        for(let i=1;i<=this.totalPage;i++) this.pages.push(i)
      }
    })
  }

  changePage(currentPage){
    this.filterObject.currentPage = currentPage;
    this.getAllProducts();
  }

  search(){
    this.getAllProducts();
  }
}
