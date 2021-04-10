import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';

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
  downloadURL: Observable<string>;
  imageUrl: String = "https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-image-upload-icon-photo-upload-icon-png-image_2047546.jpg"
  cates: Array<Category> = [];


  productForm = new FormGroup({
    id: new FormControl(null),
    cate_id: new FormControl(null),
    category: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    image: new FormControl(''),
    short_desc: new FormControl('', [
      Validators.required,
    ]),
    content: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl(null, [
      Validators.required,
    ]),
    sale_price: new FormControl(null, [
      Validators.required,
    ]),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
  });

  get name() { return this.productForm.get('name'); }
  get image() { return this.productForm.get('image'); }
  get short_desc() { return this.productForm.get('short_desc'); }
  get content() { return this.productForm.get('content'); }
  get cate_id() { return this.productForm.get('cate_id'); }
  get price() { return this.productForm.get('price'); }
  get sale_price() { return this.productForm.get('sale_price'); }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.getCates();
    this.activeRoute.paramMap.subscribe(params =>{
      let proId = params.get('proId');
      if (proId) {
        this.title = "Edit Form";
        this.productService.findById(Number(proId)).subscribe(data => {
          this.productForm.setValue(data);
          this.getCates();
          this.imageUrl = this.productForm.value.image;
        })
      }
    })
  }

  onFileSelected(event){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Uploads/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.imageUrl = url;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }

  getCates(){
    let num = [1,100];
    this.categoryService.getAll(num).subscribe(res =>{
      this.cates = res.data;
    })
  }

  saveProduct(){
    if (this.productForm.valid){
      this.productForm.value.image = this.imageUrl;
      if (this.productForm.value.id != null) {
        this.productService.editProduct(this.productForm.value).subscribe(data => {
          this.route.navigate(['/admin/product-list']);
        });
      } else {
        this.productService.addProduct(this.productForm.value).subscribe(data => {
          this.route.navigate(['/admin/product-list']);
        })
      }
    }
  }

}
