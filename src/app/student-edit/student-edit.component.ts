import {Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {Student} from "../models/student";

@Component({
  selector: 'app-student-edit',
  template: `
    <div *ngIf="isEdit == true">
    <h2>Update student!</h2>
      New Id: <input type="number" (keydown.esc)="onCancel()" value="{{data.id}}" disabled/>
      New Name: <input type="text" (keydown.esc)="onCancel()" (input)="onChangeName($event)" value="{{data.name}}"/>
      New Gender: <input type="text" (keydown.esc)="onCancel()" (input)="onChangeGender($event)" value="{{data.gender}}"/>
      <button class="btn btn-outline-primary" (click)="onSave($event)">Save</button>
      <button class="btn btn-outline-secondary" (click)="onCancel($event)">Cancel</button>
    </div>
`,
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit, OnChanges {

  private newName: string;
  private newGender: string;

  @Input() isEdit: boolean;
  @Input() data: Student;
  @Output() onCancelEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() onSaveStudent = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    this.newName = this.data.name;
    this.newGender = this.data.gender;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.isEdit)
  }

  private onSave(event){
    this.isEdit = false;
    this.onSaveStudent.emit({
      isEdit: this.isEdit,
      data: {
        id:this.data.id,
        name:this.newName,
        gender:this.newGender
      }
    })

  }

  private onCancel(event){
    this.isEdit = false;
    this.onCancelEdit.emit(this.isEdit);
  }

  private onChangeName($event){
    this.newName = $event.target.value;
  }

  private onChangeGender($event){
    this.newGender = $event.target.value;
  }
}
