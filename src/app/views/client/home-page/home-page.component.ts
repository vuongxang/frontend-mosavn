import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products: Array<any> =[];
  totalPage = null;
  pages: Array<Number> = [];

  orderData: any[] = ORDER_DATA;

  filterObject = {
    orderBy: "1",
    keyword: "",
    pagesize: 12,
    currentPage: 1
  }

  constructor(
    private productService: ProductService,
    private route: Router,
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

  changePage(currentPage){
    this.filterObject.currentPage = currentPage;
    this.getAllProducts();
  }
}
