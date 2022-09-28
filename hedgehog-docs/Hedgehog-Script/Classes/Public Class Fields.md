---
sidebar_position: 3
---

import { MathJax, MathJaxContext } from 'better-react-mathjax'


# Public Class Fields

Public and private are terms you may have heard before. In Hedgehog Script context it pertains to classes. Let's go over the public version here. 

:::warning
Private features are not supported yet in Hedgehog Script.
:::


### Public Class with Static Fields

Public `static` fields help when you need a field to be used **once per class**, not on every instance. This is used for programs making caches, fixed-config and other data related programs where every instance doesn't need replicated data. 

All one has to do to make a normal public field `static` is by adding the `static` keyword.

However, we won't dive into `static` usage as it's also experimental in Hedgehog Script currently.

### Public Instance Fields

Unlike `static` fields, public instance fields exist on **every created instance of a class**. By declaring a field public, you can ensure the field is always there.

Here is an example:

When initializing fields, `this` refers to the class instance **under construction**. Just like public instance methods, if you're in a subclass you can access the superclass prototype via `super`. The example of this would be very similar to the static one, but dropping the keyword `static`.

Note that you can access fields' values within the constructor - this is due to the instance fields of a class being added before the respective constructor runs:

```js
class ClassWithInstanceField {
    instanceField = 'instance field';

    constructor() {
        print(this.instanceField); // this will output the classes instance's instanceField which will be "instance field". The point here is it is done in the constructor, referencing a instance field.
        this.instanceField = 'new value';
    }
}

const instance = new ClassWithInstanceField(); //outputs "instance field" because the constructor is ran
print(instance.instanceField);//this time it will output "new value" as after the print statement, it changes the instanceField value to 'new value' and keeps it that way
```

However, in the case of a sub class using `super()`, the base class's constructor will not have access to the derived class's fields as instance fields of a derived class are defined after `super()` returns. An example would effectively show that given a base class and a derived sub class extending the base class, since you define instance fields of the sub class after `super()` returns, the base constructor will not change the value of its instance field to the derived class's field.



### Public methods - static methods

First let's recall or explain what `static` means. Basically it's a keyword for defining a static method or property for a class, and what it does is forces the method to be only called on the class itself not an instance of the class (an object vs object class).

When `static` is used, it defined a static method for a class. Static methods are not called on instances of the class, they're called on the class itself rather. They're often utility functions such as cloning or creating objects. Here is a simple demonstration:

```js
class ClassWithStaticMethod {
    static staticMethod() {
        return 'static method was called';
    }
}

print(ClassWithStaticMethod.staticMethod()); //notice how it's called on the class itself, not an instance of a class. This will naturally output "static method was called"
```

### Public methods - instance methods

As one can derive, while static is only called on the class itself and not the instances of a class, a public instance method is the other way: it is a method which is available for class instances. Here is a simple example:

```js
class ClassWithPublicInstanceMethod {
    publicMethod() {
        return 'public method was called';
    }
}

const instance = new ClassWithPublicInstanceMethod();
print(instance.publicMethod()); // will output "public method was called" as expected. Note that in this case, it's not 'ClassWithPublicInstanceMethod.publicMethod' - that is the static version, in this version, the new class instance is calling the method.
```

Inside instance methods, `this` refers to the instance itself. In subclasses, `super` lets one access the superclass prototype, allowing method calls from the superclass. Recall that in static methods, `this` is in reference to the constructor.

'Getters' and 'setters' are special methods that bind to a class property and are called when that property is accessed or set. Use `get` and `set` syntax to declare a public instance getter or setter:

```js
class ClassWithGetAndSet {
    #msg = 'hello';
    get msg() {
        return this.#msg;
    }
    set msg(x) {
        this.#msg = `hello ${x}`;
    }
}
const instance = new ClassWithGetAndSet();
print(instance.msg); //expected output is "hello"

//now we use the set method...
instance.msg = 'world';
print(instance.msg); //will now output "hello world" as the setter implies
```

Overall this is a long and relatively complicated topic - classes. This is the public version. There is also private features for classes. One should make sure to understand the fundamental differences between static and instance fields and methods.