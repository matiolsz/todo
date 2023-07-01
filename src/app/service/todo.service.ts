import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveTodo(id:string, data: firebase.firestore.DocumentData) {
    this.afs.collection('categories').doc(id).collection('todos').add(data).then(ref => {
      this.afs.doc('categories/' + id).update({todoCount: firebase.firestore.FieldValue.increment(1)});
      this.toastr.success('New Todo Added'); 
    })
  }

  loadTodos(id:string) {
    return this.afs.collection('categories').doc(id).collection('todos').snapshotChanges().pipe(
      map((actions: any[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  updateTodo(categoryId:string, todoId:string, newTodoName:string) {
    return this.afs.collection('categories').doc(categoryId).collection('todos').doc(todoId).update({todo: newTodoName}).then(() => {
      this.toastr.success('Todo edited successfully');
    })
  }

  deleteTodo(categoryId:string, todoId:string) {
    this.afs.collection('categories').doc(categoryId).collection('todos').doc(todoId).delete().then(()=>
    this.afs.doc('categories/' + categoryId).update({todoCount: firebase.firestore.FieldValue.increment(-1)}));
    this.toastr.error('Deleted todo');
  }

  markComplete(categoryId:string, todoId:string) {
    return this.afs.collection('categories').doc(categoryId).collection('todos').doc(todoId).update({isCompleted: true}).then(() => {
      this.toastr.success('Todo marked as completed');
    })
  }

  markUncomplete(categoryId:string, todoId:string) {
    return this.afs.collection('categories').doc(categoryId).collection('todos').doc(todoId).update({isCompleted: false}).then(() => {
      this.toastr.success('Todo marked as uncompleted');
    })
  }

  getCategoryName(categoryId: string) {
    return this.afs
      .collection('categories')
      .doc(categoryId)
      .get()
      .pipe(
        map((snapshot) => {
          const data = snapshot.data();
          return { data };
        })
      );
  }

  getTenTodos(categoryId: string) {
    return this.afs.collection('categories').doc(categoryId).collection('todos', ref => ref.limit(10)).snapshotChanges().pipe(
      map((actions: any[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

}
