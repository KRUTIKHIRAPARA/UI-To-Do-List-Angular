import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  tasksUrl = 'http://localhost:3000/tasks';

  constructor(private _http : HttpClient) { }


  // TASKS CRUD PERFORMS METHODS

  getAllTasksDatas(){
    return this._http.get<Array<TodoPermision>>(this.tasksUrl);
  }

  addTaskData(body:TodoPermision){
    return this._http.post(this.tasksUrl,body);
  }

  updateTaskData(body:TodoPermision){
    return this._http.put(`${this.tasksUrl}/${body.id}`,body);
  }

  updateTaskDoneData(body:TodoPermision){
    return this._http.put(`${this.tasksUrl}/${body.id}`,body);
  }
  
  updateTaskUnDoneData(body:TodoPermision){
    return this._http.put(`${this.tasksUrl}/${body.id}`,body.task_done=true);
  }

  deleteTaskData(body:TodoPermision){
    return this._http.delete(`${this.tasksUrl}/${body.id}`);
  }

}

export class TodoPermision{
    id ?: number;
    task_name ?: string;
    tag_name : string;
    tag_fg_color : string;
    tag_bg_color : string;
    task_done : boolean = false;
}