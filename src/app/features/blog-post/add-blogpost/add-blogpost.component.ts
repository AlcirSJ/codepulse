import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogpostListComponent } from '../blogpost-list/blogpost-list.component';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, timeout } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../category/models/category.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{

  model: AddBlogPost;
  categoryDropdown: Category[] = [];


  constructor( private blogpostservice: BlogPostService,
               private categoryService: CategoryService,
               private router: Router,
               private toastr: ToastrService
  ) {
    this.model = {
      title:'',
      shortDescription:'',
      urlHandle: '',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible: true,
      categories: [],
      publishedDate: new Date()
    }
  }

  dropdownSettings: IDropdownSettings = {};
 

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',   
      itemsShowLimit: 5,
      allowSearchFilter: true,
      defaultOpen: false
    };
     this.dropDownSettings();
  }

  dropDownSettings(){
    this.categoryService.getAllCategories()
      .subscribe({
        next: (data) => {
          this.categoryDropdown = data;
        },
        error: () => {
          this.toastr.error('Error loading categories','Error', {timeOut: 15000});
        }
      });
  }

  
  onFormSubmit() : void{
    debugger;
    let categories = this.model.categories.map(x => x.id);  
    this.model.categories = categories as any;
    this.blogpostservice.createBlogPost(this.model)
    .subscribe({
     next: (response) => {
      this.router.navigateByUrl('admin/blogposts')
     }
    });
    this.dropDownSettings();
  }
}
