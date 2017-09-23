import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Student} from "../models/student";
import {Observable, BehaviorSubject} from "rxjs";
import {StudentServiceService} from "../student-service/student-service.service";
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-student-component',
  template: `
    <app-add-students-component (addNewStudent)="onAddNewStudent($event)"></app-add-students-component>
    <app-student-edit *ngIf="isEdit" [(isEdit)]="isEdit" 
                      (onCancelEdit)="onCancelEditStudent($event)"
                      (onSaveStudent)="onSaveStudent($event)"
                      [data]="studentEditData"></app-student-edit>
    <app-list-students-component 
    [students]="studentObs | async" (deleteStudent)="onDeleteStudent($event)" (editedStudent)="onEdit($event)" [isEdit]="isEdit">
    
    </app-list-students-component>
  `,
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent implements OnDestroy, OnInit{

  studentEditData: Student;
  studentObs: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  response: any;

  isEdit:boolean;

  constructor(private studentService: StudentServiceService) {
    this.isEdit = false;
  }

  private onAddNewStudent($event) {
    this.response = this.studentService.addStudent($event).subscribe(
      resp => {
        this.response = resp;
        const students = this.studentObs.getValue();
        const newStudents = Object.assign($event,{
          id: $event.id,
          name: $event.name,
          gender: $event.gender
        });
        this.studentObs.next([
          ...students,
          newStudents
        ])
      });
  }

  private onSaveStudent($event){
    this.isEdit = $event.isEdit;
    this.studentService.updateStudent($event.data).subscribe(resp => {
      this.response = resp;
      const students = this.studentObs.getValue();
      this.studentObs.next(students.map(student => {
        if( student.id === $event.data.id){
          return Object.assign($event.data, {
            name: $event.data.name,
            gender: $event.data.gender
          });
        }
        return student;
      }));
      this.studentObs.next(this.studentObs.getValue());
    });
  }

  private onDeleteStudent(studentId){
    console.log(studentId);
    this.studentService.removeStudent(studentId).subscribe(resp => {
      this.response = resp;
      const students = this.studentObs.getValue();
      this.studentObs.next(students.filter(student => student.id != studentId))
    });
  }

  private onEdit($event){
    this.isEdit = $event.isEdit;
    this.studentEditData = $event.data;
  }

  private onCancelEditStudent($event){
    this.isEdit=$event;
  }
  ngOnInit(): void {
    this.studentService.loadStudents()
      .subscribe( students => this.studentObs.next(students));
  }
  ngOnDestroy(): void {
    this.response.complete();
  }

}
