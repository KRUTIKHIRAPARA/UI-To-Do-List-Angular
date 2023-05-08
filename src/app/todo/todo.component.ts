import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService, TodoPermision } from '../service/crud.service';
import { TagPermision } from '../service/crud.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  allTasks: Array<TodoPermision> = new Array();
  allTags: Array<TagPermision> = new Array();
  getTasks: TodoPermision;
  getTags: TagPermision;

  constructor(private _crud: CrudService, private _toastr: ToastrService) { }
  // this._toastr.success('Hello world!', 'Toastr fun!');

  ngOnInit(): void {
    this.getTasks = new TodoPermision;
    this.getTags = new TagPermision;

    this.getAllTasks();
    this.getAllTags();
  }

  getAllTasks() {
    this._crud.getAllTasksDatas().subscribe({
      next: (res) => {
        console.log(res);
        this.allTasks = res;
      },
      error:(err)=>{
        this._toastr.error(err.status);
      }
    });
  }

  getAllTags() {
    this._crud.getAllTags().subscribe({
      next: (res) => {
        console.log(res);
        this.allTags = res;
      },
      error:(err)=>{
        this._toastr.error(err.status);
      }
    });
  }

  addTask(){
    this._crud.addTaskData(this.getTasks).subscribe({
      next: (res) => {
        this._toastr.success('Success', 'Task Added Successfuly...s');
      },
      error:(err)=>{
        this._toastr.error(err);
      }
    });
  }

  updateTask(data:TodoPermision){
    this._crud.updateTaskData(data).subscribe({
      next: (res) => {
        this._toastr.success('Success', 'Task Updated Ssuccessfuly...s');
      },
      error:(err)=>{
        this._toastr.error(err);
      }
    });
  }

  deleteTask(data:TodoPermision){

    if(confirm("Are you sure to delete?")) {
      this._crud.deleteTaskData(data).subscribe({
        next: (res) => {
          this._toastr.success('Success', 'Task Deleted Successfuly...s');
        },
        error:(err)=>{
          this._toastr.error(err);
        }
      });
    }
  }



}
