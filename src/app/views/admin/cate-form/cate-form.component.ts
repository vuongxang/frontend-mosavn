import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cate-form',
  templateUrl: './cate-form.component.html',
  styleUrls: ['./cate-form.component.sass']
})
export class CateFormComponent implements OnInit {

  heading = "Thêm danh mục";
  subheading = "Để thêm mới danh mục mới vui lòng click create new";
  icon = "pe-7s-magic-wand icon-gradient bg-mixed-hopes";
  link="/admin/add-cate";

  title = "Add Form";

  cateForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
    ]),
    desc: new FormControl('', [
      Validators.required,
    ]),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
  });

  get name() { return this.cateForm.get('name'); }
  get image() { return this.cateForm.get('image'); }
  get desc() { return this.cateForm.get('desc'); }
  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      let cateId = params.get('cateId');
      if (cateId) {
        this.title = "Edit Form";
        this.categoryService.getCateById(Number(cateId)).subscribe(data => {
          this.cateForm.setValue(data);
          console.log(this.cateForm.value);
        })
      }
    })
  }

  saveCate() {
    if (this.cateForm.valid) {
      if (this.cateForm.value.id != null) {
        this.categoryService.editCate(this.cateForm.value).subscribe(data => {
          this.route.navigate(['/admin/categories']);
        });
      } else {
        this.categoryService.addCate(this.cateForm.value).subscribe(data => {
          this.route.navigate(['/admin/categories']);
        })
      }
    }
  }
}
