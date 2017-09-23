import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StudentComponentComponent } from './student-component/student-component.component';
import { ListStudentsComponentComponent } from './list-students-component/list-students-component.component';
import { AddStudentsComponentComponent } from './add-students-component/add-students-component.component';
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {StudentServiceService} from "./student-service/student-service.service";
import { StudentItemComponent } from './student-item/student-item.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponentComponent,
    ListStudentsComponentComponent,
    AddStudentsComponentComponent,
    StudentItemComponent,
    StudentEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule
  ],
  providers: [
    StudentServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
