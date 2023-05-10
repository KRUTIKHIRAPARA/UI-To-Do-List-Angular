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
  removeDuplicatesArrayByName: Array<any>= [];
  allTags = new Array();

  getTasks: TodoPermision;
  
  conditionTF = false;
  updateAddBtn = false;

  
  searchDatas : string;
  
  constructor(private _crud: CrudService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTasks = new TodoPermision;
    this.getAllTasks();
  }


  // Remove Duplicates Tags
  
  removeDuplicates(myArray, Prop) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }

  // removeDuplicates(arr){
  //   return [...new Set(arr)];
  // }
  

  // Change Completed or All task show
  
  allAndCompletedTasks(event){
    if(event.target.checked){
      this.conditionTF = true;
    }
    else{
      this.conditionTF = false
    }
  }
  

  // Move done task
  
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


  // Search tasks method
  
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
  

  // Search tags method
  
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
  

  // Get all tasks method
  
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
  

  // Get all tags method
  
  getAllTags() {
    this._crud.getAllTasksDatas().subscribe({
      next: (res) => {
        console.log(res);
        this.allTags = res;
        this.removeDuplicatesArrayByName = this.removeDuplicates(res, "tag_name")
        // this.removeDuplicatesArrayByName = this.removeDuplicates(res)
      },
      error:(err)=>{
        this._toastr.error(err.status);
      }
    });
  }
  

  // Add task method
  
  addTask(){
    if(this.getTasks.task_name){
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
    else{
      this._toastr.warning('Warning', 'Please enter task!!!');
    }
    
  }


  // Edit task time fill data in input part method
  
  fillData(data:TodoPermision){
    this.getTasks = data;
    this.updateAddBtn = true;
  }
  

  // Update task method
  
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
  

  // Delete task method

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
