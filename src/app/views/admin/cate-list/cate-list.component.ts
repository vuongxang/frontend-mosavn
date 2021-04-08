import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {Observable} from 'rxjs';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.sass']
})
export class CateListComponent implements OnInit {
  heading = "Thêm danh mục";
  subheading = "Để thêm mới danh mục mới vui lòng click create new";
  icon = "pe-7s-magic-wand icon-gradient bg-mixed-hopes";
  link="/admin/add-cate";

  currentPage = null;
  totalPage = 0;
  pageSize = 3;

  arr = [this.currentPage,this.pageSize];

  pages: Array<Number> = [];
  cates: Array<Category> = [];
  constructor(
    private categoryService : CategoryService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll(this.arr).subscribe(res => {
      this.cates = res.data;
      this.currentPage = res.current_page;
      this.totalPage = res.last_page;

      for(let i=1;i<=this.totalPage;i++) this.pages.push(i)
    })
  }

  chanPageSize(event){
    this.pageSize = event.target.value;
    this.arr = [this.currentPage,this.pageSize];
    this.categoryService.getAll(this.arr).subscribe(res => {
      this.cates = res.data;
      this.currentPage = res.current_page;
      this.totalPage = res.last_page;
      this.pages = [];
      for(let i=1;i<=this.totalPage;i++) this.pages.push(i)
    })
  }

  changePage(num){
    this.currentPage = num;
    this.getAllCates();
  }

  prePage(){
    this.currentPage= this.currentPage-1;
    this.getAllCates();
  }
  nextPage(){
    this.currentPage= this.currentPage+1;
    this.getAllCates();
  }

  getAllCates(){
    this.arr = [this.currentPage,this.pageSize];
    this.categoryService.getAll(this.arr).subscribe(res=>{
      this.cates = res.data;
    })
  }

  removeCate(id){
    let conf = confirm("Bạn chắc chắn xóa");
    if(conf){
      this.categoryService.removeById(id).subscribe(data=>{
         this.route.navigate(['/admin/categories']);
      })
    }
  }
}
