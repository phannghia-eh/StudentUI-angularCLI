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
        <tr *ngFor="let student of students; let i = index" [attr.data-index]="i">
          <td>
            <div >
              <input name="id" class="transparent-input" type="text" (keydown.esc)="onCancel()" value="{{student.id}}" disabled/>
            </div>
          </td>
          <td>
            <div >
              <input name="name" class="transparent-input" type="text" (keydown.esc)="onCancel()" value="{{student.name}}" disabled/>
            </div>
          </td>
          <td>
            <div >
              <input name="gender" class="transparent-input" type="text" value="{{student.gender}}" disabled/>
            </div>
          </td>
          <td>
            <button  class="btn btn-outline-primary" (click)="onEdit($event)">Edit</button>
          </td>
          <td><button class="btn btn-outline-secondary" (click)="onDelete($event)" id="{{student.id}}">Delete</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./list-students-component.component.css']
})
export class ListStudentsComponentComponent implements OnInit {

  @Input()
  private isEdit: boolean;

  private choosenItemId: string;
  private choosenStudent: Student;

  @Input() students: Student[];
  @Output() deleteStudent: EventEmitter<string> = new EventEmitter();
  @Output() editedStudent = new EventEmitter();

  constructor() {

  }

  private onEdit($event){
    let index: number = $event.target.parentNode.parentNode.attributes[1].nodeValue;
    this.isEdit = true;
    this.editedStudent.emit({
      isEdit: this.isEdit,
      data: this.students[index]
    });
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
