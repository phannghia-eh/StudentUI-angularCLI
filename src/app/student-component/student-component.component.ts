import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Student} from "../models/student";
import {STUDENTS} from "../list-students-component/list-student-constant.constant";
import {Observable, BehaviorSubject} from "rxjs";
import {StudentServiceService} from "../student-service/student-service.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-student-component',
  template: `
    <app-add-students-component (addNewStudent)="onAddNewStudent($event)" (studentChanged)="onStudentChanged($event)"></app-add-students-component>
    <app-list-students-component 
    [students]="studentObs | async" (deleteStudent)="onDeleteStudent($event)">
    
    </app-list-students-component>
  `,
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent implements OnDestroy, OnInit{
  studentObs: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  response: any;

  constructor(private studentService: StudentServiceService) {
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
  //
  // private onStudentChanged($event){
  //   this.studentObs = this.studentObs.map(students =>
  //     students.map(existingStudent =>
  //       existingStudent.id === $event.id ? $event : existingStudent))
  // }

  private onDeleteStudent(studentDeleted){
    console.log(studentDeleted);
    this.studentService.removeStudent(studentDeleted).subscribe(resp => {
      this.response = resp;
      const students = this.studentObs.getValue();
      console.log(students);
      this.studentObs.next(students.filter(student => student.id != studentDeleted))
    });
  }

  ngOnInit(): void {
    this.studentService.loadStudents()
      .subscribe( students => this.studentObs.next(students));
  }
  ngOnDestroy(): void {
    this.response.complete();
  }

}
