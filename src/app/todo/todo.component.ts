import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService, TodoPermision } from '../service/crud.service';
import { Subject, filter} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {

  allTasks: Array<TodoPermision> = new Array();
  allTags = new Array();
  removeDuplicatesArrayByName: Array<any>= [];
  getTasks: TodoPermision;
  conditionTF = false;
  updateAddBtn = false;
  searchDatas : string;
  
  constructor(private _crud: CrudService, private _toastr: ToastrService) { }
  // this._toastr.success('Hello world!', 'Toastr fun!');
  

  ngOnInit(): void {
    this.getTasks = new TodoPermision;
    
    this.getAllTasks();
    
  }

  removeDuplicates(myArray, Prop) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
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
        this._crud.updateTaskUnDoneData(i).subscribe({
          next: (res) => {
              this.conditionTF = false;  
              this.getAllTasks();
            },
            error:(err)=>{
              this._toastr.error(err);
            }
          });
        }
        else{
          this.conditionTF = false;
          this._crud.updateTaskDoneData(i).subscribe({
            next: (res) => {
              this.conditionTF = true;
              this.getAllTasks();
            },
            error:(err)=>{
              this._toastr.error(err);
            }
          });
      }
  }

  searchTask(){
    if (this.searchDatas) {
      let searchEmployee = new Array<TodoPermision>();
      if (this.allTasks.length > 0) {
        for (let emp of this.allTasks) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchDatas.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.allTasks= searchEmployee;
      }
    }
    else {
      this.getAllTasks();
    }
  }

  tagSearchData(data){
    if (data) {
      let searchEmployee = new Array<TodoPermision>();
      if (this.allTasks.length > 0) {
        for (let emp of this.allTasks) {
          if (JSON.stringify(emp).toLowerCase().indexOf(data.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.allTasks= searchEmployee;
      }
      else{
        this.getAllTasks();
      }
    }
    else {
      this.getAllTasks();
    }
  }

  getAllTasks() {
    this._crud.getAllTasksDatas().subscribe({
      next: (res) => {
        this.allTasks = res;
        this.getAllTags();
      },
      error:(err)=>{
        this._toastr.error(err.status);
      }
    });
  }

  getAllTags() {
    this._crud.getAllTasksDatas().subscribe({
      next: (res) => {
        console.log(res);
        this.allTags = res;
        this.removeDuplicatesArrayByName = this.removeDuplicates(res, "tag_name")
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

  fillData(data:TodoPermision){
    this.getTasks = data;
    this.updateAddBtn = true;
  }

  updateTask(){
    this._crud.updateTaskData(this.getTasks).subscribe({
      next: (res) => {
        this.getAllTasks();
        this.updateAddBtn = false;
        this.getTasks = new TodoPermision;
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
          this.getAllTasks();
          this._toastr.success('Success', 'Task Deleted Successfuly...');
        },
        error:(err)=>{
          this._toastr.error(err);
        }
      });
    }
  }
}
