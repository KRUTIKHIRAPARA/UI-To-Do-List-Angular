import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  tasksUrl = 'http://localhost:3000/tasks';

  constructor(public _http : HttpClient) { }


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
    const task_update= false;
    return this._http.put(`${this.tasksUrl}/${body.id}`,{task_name:body.task_name, tag_name:body.tag_name, tag_fg_color:body.tag_fg_color, tag_bg_color:body.tag_bg_color, task_done:task_update});
  }
  
  updateTaskUnDoneData(body:TodoPermision){
    const task_up = true;
    return this._http.put(`${this.tasksUrl}/${body.id}`,{task_name:body.task_name, tag_name:body.tag_name, tag_fg_color:body.tag_fg_color, tag_bg_color:body.tag_bg_color, task_done:true});
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