/*
継承を使ったクラス設計

class Animal {
  eat() {}
}

class Dog extends Animal {
  bite() {}
}

class Husky extends Dog {}

class Cat extends Animal {
  scratch() {}
}

class Bird extends Animal {
  fly() {}
}

class Fish extends Animal {
  swim() {}
}
*/

class Animal {
  eat() {}
  makeSound() {}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Dog {
  // 操作を委譲するAnimalクラスのインスタンス
  #animal;
  constructor() {
    this.animal = new Animal();
  }
  bite() {}
  eat() {
    this.#animal.eat();
  }
  makeSound() {
    this.#animal.makeSound();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Husky {
  // 操作を委譲するAnimalクラスのインスタンス
  #animal;
  constructor() {
    this.animal = new Animal();
  }
  eat() {
    this.#animal.eat();
  }
  makeSound() {
    this.#animal.makeSound();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Cat {
  // 操作を委譲するAnimalクラスのインスタンス
  #animal;
  constructor() {
    this.animal = new Animal();
  }
  scratch() {}
  eat() {
    this.#animal.eat();
  }
  makeSound() {
    this.#animal.makeSound();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Bird {
  // 操作を委譲するAnimalクラスのインスタンス
  #animal;
  constructor() {
    this.animal = new Animal();
  }
  fly() {}
  eat() {
    this.#animal.eat();
  }
  makeSound() {
    this.#animal.makeSound();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Fish {
  // 操作を委譲するAnimalクラスのインスタンス
  #animal;
  constructor() {
    this.animal = new Animal();
  }
  eat() {
    this.#animal.eat();
  }
  swim() {}
}
