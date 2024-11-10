// is tabnine working?
// how can I tell?

type Person = {
  name: string;
  age: number;
}

const newPerson: Person = {
  name: 'John Doe',
  age: 30,
}

const newPerson2: Person = {
  name: 'Jane Doe',
  age: 28,
}

function getOlderPerson(person1: Person, person2: Person): Person { 
  if (person1.age > person2.age) {
    return person1;
  } else {
    return person2;
  }
}

console.log(getOlderPerson(newPerson, newPerson2)); // Output: { name: 'John Doe', age: 30 }