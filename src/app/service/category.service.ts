import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveCategory(data: any) {
    this.afs.collection('categories').add(data).then(ref => {
      this.toastr.success('New Category Saved Successfully');
    });
  }

  loadCategories() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map((actions: any[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  editCategory(id:string, newName:string) {
    return this.afs.doc('categories/' + id).update({category: newName}).then( () => {
      this.toastr.success('Updated Successfully');
      this.loadCategories();
    })
  }

  deleteCategory(id:string) {
    return this.afs.doc('categories/' + id).delete().then( () =>{
      this.toastr.success('Deleted Successfully');
      this.loadCategories();

    })
  }

}
