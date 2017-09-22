import {Component, OnInit, Input} from '@angular/core';
import {Student} from "../models/student";

@Component({
  selector: 'app-student-item',
  template: `
    <tr>
      <td>
        <div *ngIf="!isEdit">
          <input name="newId" class="transparent-input" type="text" (keydown.esc)="onCancel()" value="{{student.id}}"/>
        </div>
        <div *ngIf="isEdit"><input type="text" value="{{student.id}}"/></div>
      </td>
      <td>
        <div *ngIf="!isEdit">
          <input name="newName" class="transparent-input" type="text" (keydown.esc)="onCancel()" value="{{student.name}}"/>
        </div>
        <div *ngIf="isEdit"><input type="text" value="{{student.name}}"/></div>
      </td>
      <td>
        <div *ngIf="!isEdit">
          <input name="newGender" class="transparent-input" type="text" value="{{student.gender}}"/>
        </div>
        <div *ngIf="isEdit"><input type="text" value="{{student.gender}}"/></div>
      </td>
      <td>
        <button *ngIf="!isEdit" class="btn btn-outline-primary" (click)="onEdit($event)">Edit</button>
        <button *ngIf="isEdit" class="btn btn-outline-primary" (click)="onSave($event)" [value]="id">Save</button>
      </td>
      <td><button class="btn btn-outline-secondary" (click)="onDelete($event)" id="{{student.id}}">Delete</button></td>
    </tr>
`,
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {

  @Input() student: Student;
  private isEdit = false;
  constructor() { }

  ngOnInit() {
  }

}
