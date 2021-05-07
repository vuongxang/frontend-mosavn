import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { map, finalize } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { ProductGaleryService } from 'src/app/services/product-galery.service';

@Component({
  selector: 'app-product-galery',
  templateUrl: './product-galery.component.html',
  styleUrls: ['./product-galery.component.sass']
})
export class ProductGaleryComponent implements OnInit {

  heading = "Thêm sản phẩm";
  subheading = "Để thêm mới sản phẩm vui lòng click create new";
  icon = "pe-7s-magic-wand icon-gradient bg-mixed-hopes";
  link="/admin/add-product";
  downloadURL: Observable<string>;
  productGaleryData: any ={
    pro_id: null,
    image: ""
  };
  product:any = {};
  constructor(
    private productService: ProductService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private productGaleryService: ProductGaleryService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params =>{
      let proId = params.get('proId');
      if (proId) {
        this.productService.findById(Number(proId)).subscribe(data => {
          this.product = data;
          this.productGaleryData.pro_id = proId;
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
            this.productGaleryData.image = url;
            console.log(this.productGaleryData);
            this.productGaleryService.addProductGalery(this.productGaleryData).subscribe(data=>{
              this.productService.findById(this.productGaleryData.pro_id).subscribe(res => {
                this.product = res;
              })
            });
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }

  removeImage(id){
    this.productGaleryService.removeByid(id).subscribe(data=>{
      this.productService.findById(this.productGaleryData.pro_id).subscribe(res => {
        this.product = res;
      })
    })
  }
}
