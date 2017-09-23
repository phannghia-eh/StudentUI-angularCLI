import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from "../models/student";

@Component({
  selector: 'app-add-students-component',
  template: `
    <form>
      <span>ID: </span>
      <input type="text" name="id" placeholder="1412344" [value] = "id" (input)="onInputIdChange($event)"/>
      <span>Name: </span>
      <input type="text" name="name" placeholder="Phan Nghĩa" [value] = "name" (input)="onInputNameChange($event)"/>
      <span>Gender:</span>
      <input type="text" name="gender" placeholder="Male" [value] = "gender" (input)="onInputGenderChange($event)"/>
      <input type="button" value="Add" (keydown.enter)="onAddNewStudent()" (click)="onAddNewStudent()"/>
    </form>
  `,
  styleUrls: ['./add-students-component.component.css']
})
export class AddStudentsComponentComponent {
  id=null;
  name='';
  gender='';

  @Output() addNewStudent: EventEmitter<Student> = new EventEmitter();

  onAddNewStudent($event){
    this.addNewStudent.emit({
      id:this.id,
      name:this.name,
      gender:this.gender
    })
  }

  onInputIdChange($event){
    this.id = $event.target.value;
  }
  onInputNameChange($event){
    this.name = $event.target.value;
  }
  onInputGenderChange($event){
    this.gender = $event.target.value;
  }
}
