abstract class User { 
  abstract greet(): string;
}


class Employee extends User { 
  greet(): string {
    return "Hello, I'm an employee";
  }
}