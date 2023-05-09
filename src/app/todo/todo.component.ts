import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService, TodoPermision } from '../service/crud.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  allTasks: Array<TodoPermision> = new Array();
  getTasks: TodoPermision;

  conditionTF = false;
  
  constructor(private _crud: CrudService, private _toastr: ToastrService) { }
  // this._toastr.success('Hello world!', 'Toastr fun!');
  
  ngOnInit(): void {
    this.getTasks = new TodoPermision;
    
    this.getAllTasks();
  }
  
  allAndCompletedTasks(event){
    if(event.target.checked){
      this.conditionTF = true;
    }
    else{
      this.conditionTF = false
    }
  }
  
  convertDoneOnUnDone(event,i){
      if(event.target.checked){
        this.conditionTF = true;  
        this._crud.updateTaskDoneData(i).subscribe({
            next: (res) => {
              this.getAllTasks();
            },
            error:(err)=>{
              this._toastr.error(err);
            }
          });
        }
        else{
          this.conditionTF = false;
          this._crud.updateTaskUnDoneData(i).subscribe({
            next: (res) => {
              this.getAllTasks();
              this._toastr.success('Success', 'Task Updated Successfuly...');
            },
            error:(err)=>{
              this._toastr.error(err);
            }
          });
      }
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

  addTask(){
      this._crud.addTaskData(this.getTasks).subscribe({
        next: (res) => {
          this.getTasks = new TodoPermision;
          this.getAllTasks();
          this._toastr.success('Success', 'Task Added Successfuly...');
        },
        error:(err)=>{
          this._toastr.error(err);
        }
      });
  }

  updateTask(data:TodoPermision){
    this._crud.updateTaskData(data).subscribe({
      next: (res) => {
        this.getAllTasks();
        this._toastr.success('Success', 'Task Updated Successfuly...');
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
