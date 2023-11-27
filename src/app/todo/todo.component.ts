import { Component } from '@angular/core';
import { TODO } from './todo-interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todo: Array<TODO> = [];
  text: string = '';
  isCompleted: boolean = false;
  isTasks: boolean = false;
  isEdit: boolean = false;
  isEditData: any = {};
  errorMessage: string = '';

  setLocalStorage() {
    localStorage.setItem('parth-todo-list', JSON.stringify(this.todo));
  }

  checkTodoList() {
    this.isCompleted = Boolean(
      this.todo.find((todo) => todo.completed == true)
    );
    this.isTasks = Boolean(this.todo.find((todo) => todo.completed == false));
  }

  handleTodoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  handleAddTodo() {
    let checklist = this.todo.filter((t) => t.text == this.text);
    if (checklist.find((task) => task.completed === true)) {
      this.errorMessage = 'Your task is already completed.';
    } else if (checklist.length) {
      this.errorMessage = 'Your task is already added.';
    } else {
      if (this.isEdit) {
        this.errorMessage = '';
        this.todo.map((todo) =>
          todo.id == this.isEditData.id ? (todo.text = this.text) : false
        );
      } else {
        this.errorMessage = '';
        let newId = this.todo[this.todo.length - 1]?.id + 1;
        this.todo.push({
          text: this.text,
          id: newId || 0,
          completed: false,
          date: new Date(),
        });
      }
      this.setLocalStorage();
      this.isEditData = {};
      this.isEdit = false;
      this.isTasks = true;
      this.text = '';
      console.log(this.todo, this.isCompleted);
    }
  }

  handleCheck(id: number) {
    this.errorMessage = '';
    this.todo.map((todo) => (todo.id == id ? (todo.completed = true) : false));
    this.setLocalStorage();
    this.isCompleted = true;
    this.isTasks = Boolean(this.todo.find((todo) => todo.completed == false));
  }

  handleEdit(id: number) {
    this.errorMessage = '';
    let editData = this.todo.find((todo) => todo.id == id);
    this.isEditData = editData;
    this.isEdit = true;
    this.text = editData?.text || '';
    this.checkTodoList();
  }

  handleDelete(id: number) {
    this.errorMessage = '';
    this.todo = this.todo.filter((todo) => todo.id !== id);
    this.setLocalStorage();
    this.checkTodoList();
  }

  handleReopen(id: number) {
    this.errorMessage = '';
    this.todo.map((todo) => (todo.id == id ? (todo.completed = false) : false));
    this.setLocalStorage();
    this.checkTodoList();
  }
}
