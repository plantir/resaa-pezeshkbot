class Parent {
  static get foo() {
    // Throw an error to indicate that this is an abstract method.
    return 'vow';
  }

  logFoo() {
    console.log(this.constructor.foo);
  }
}

class Child extends Parent {
  // static get foo() {
  //   return 'yay';
  // }
}

const child = new Child(); // Prints 'yay'
child.logFoo(); // Prints 'yay'
