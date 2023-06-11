import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {

  color: Array<any> = [
    '#11009E',
    '#4942E4',
    '#8696FE',
    '#C4B0FF',
  ]


  categories: Array<any> | undefined;

  categoryName: string = '';

  categoryId: string = '';

  buttonStatus: string = 'Add';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.loadCategories().subscribe(val => {
      this.categories = val;
    })
  }

  onSubmit(f: NgForm) {

    if (this.buttonStatus == 'Add') {
      let randomNumber = Math.floor(Math.random() * this.color.length);

      let todoCategory = {
        category: f.value.categoryName,
        colorCode: this.color[randomNumber],
        todoCount: 0
      }
      this.categoryService.saveCategory(todoCategory);
      f.resetForm();

    }
    if (this.buttonStatus == 'Edit') {
      this.categoryService.editCategory(this.categoryId, this.categoryName);
      f.resetForm();
      this.buttonStatus = 'Add';
    }

  }

  onEdit(categoryName: string, id: string) {
    this.categoryName = categoryName;
    this.categoryId = id;
    this.buttonStatus = 'Edit';

  }

  delete(id: string) {
    this.categoryService.deleteCategory(id);

  }
}
