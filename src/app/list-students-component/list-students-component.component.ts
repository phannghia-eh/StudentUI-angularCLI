import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Student} from "../models/student";

@Component({
  selector: 'app-list-students-component',
  template: `
    <table class="table table-inverse">
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody>
        <tr *ngFor="let student of students">
          <td>
            <div *ngIf="!isEdit">
              <input name="newId" class="transparent-input" type="text" (keydown.esc)="onCancel()" value="{{student.id}}" disabled/>
            </div>
            <div *ngIf="isEdit"><input type="text" value="{{student.id}}"/></div>
          </td>
          <td>
            <div *ngIf="!isEdit">
              <input name="newName" class="transparent-input" type="text" (keydown.esc)="onCancel()" value="{{student.name}}" disabled/>
            </div>
            <div *ngIf="isEdit"><input type="text" value="{{student.name}}"/></div>
          </td>
          <td>
            <div *ngIf="!isEdit">
              <input name="newGender" class="transparent-input" type="text" value="{{student.gender}}" disabled/>
            </div>
            <div *ngIf="isEdit"><input type="text" value="{{student.gender}}"/></div>
          </td>
          <td>
            <button *ngIf="!isEdit" class="btn btn-outline-primary" (click)="onEdit($event)">Edit</button>
            <button *ngIf="isEdit" class="btn btn-outline-primary" (click)="onSave($event)" [value]="student.id">Save</button>
          </td>
          <td><button class="btn btn-outline-secondary" (click)="onDelete($event)" id="{{student.id}}">Delete</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./list-students-component.component.css']
})
export class ListStudentsComponentComponent implements OnInit {

  private isEdit: boolean;

  private choosenItemId: string;
  private choosenStudent: Student;

  @Input() students: Student[];
  @Output() deleteStudent: EventEmitter<string> = new EventEmitter();
  @Output() editedStudent = new EventEmitter();

  constructor() {
    this.isEdit = false;
  }

  private onEdit($event){
    this.isEdit = true;
  }

  private onSave($event){
    this.isEdit = false;
    console.log($event.target)
    this.choosenStudent.id = $event.target.attribute.id.nodeValue;
    this.choosenStudent.name = $event.target.attribute.name.nodeValue;
    this.choosenStudent.gender = $event.target.attribute.gender.nodeValue;
    console.log(this.choosenStudent);
  }

  private onDelete($event){
    this.choosenItemId = $event.target.attributes.id.nodeValue;
    this.deleteStudent.emit(this.choosenItemId);
  }

  private onCancel(){
    this.isEdit = false;
  }
  ngOnInit() {
  }

}
