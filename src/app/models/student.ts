export interface StudentInterface {
  id: number;
  name: string;
  gender: string;
}

export class Student implements StudentInterface{
  id: number;
  name: string;
  gender: string;

  constructor(that: StudentInterface) {
    this.id = that.id;
    this.name = that.name;
    this.gender = that.gender;
  }
}
