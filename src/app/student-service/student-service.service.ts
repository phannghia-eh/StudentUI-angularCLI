import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import GenericService from './generic.service';
import {Response, RequestOptions, Http, Headers} from '@angular/http';
import {Student} from "../models/student";
import {STUDENTS} from "../list-students-component/list-student-constant.constant";
import {of} from "rxjs/observable/of";
import 'rxjs/add/operator/map'

@Injectable()
export class StudentServiceService {
  // private students: Array<Student>;
  //
  // constructor(injector: Injector) {
  //   super(injector);
  //   this.BASE_URL += 'students';
  // }
  //
  // public loadStudents(): Observable<Student[]> {
  //   return this.get();
  // }
  //
  // public addStudent(student: Student):Observable<Response>{
  //   return this.post(student);
  // }
  constructor (private http: Http) {}
  private studentsUrl = 'http://localhost:3000/student/api/students';

  // Fetch all existing comments
  loadStudents() : Observable<Student[]>{
    // ...using get request
    return this.http.get(this.studentsUrl)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  // Add a new student
  addStudent (body: Object): Observable<Student[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.studentsUrl, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  // Update a student
  updateStudent (body: Object): Observable<Student[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.studentsUrl}/${body['id']}/`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  // Delete a student
  removeStudent (id: string): Observable<Student[]> {
    return this.http.delete(`${this.studentsUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
