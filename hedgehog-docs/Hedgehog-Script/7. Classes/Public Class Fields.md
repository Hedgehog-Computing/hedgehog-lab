---
sidebar_position: 3
---

import { MathJax, MathJaxContext } from 'better-react-mathjax'


# Public Class Fields

The terms public and private pertain to classes in how their class members (properties, methods) are available

- For public, members are available to everyone. For private it is limited to the functions in that class.

We will be discussing the **public** version of classes here.

:::warning
Private features are limited in Hedgehog Script.
:::

---

### Public Class with `static` Fields

Let's say you create a class instance. If it has a `static` field, it will available once and only once!

- Specifically, all instances of the class **shares** the `static` field

Also, `static` fields belong to the *class itself*, **not** the instances of the class.  

:::tip

To make a normal public field `static`, just add the keyword `static` in front of its declaration!

:::

The opposite of a `static` field, or when we say "normal" is called an **instance field**. 

Here is an example displaying the difference:

<iframe
    src="https://hlab.app/s/docs/staticex1_hbook"
    width="100%"
    height="400px"/>

---

### Public Instance Fields

Unlike `static` fields, public instance fields exist on **every created instance of a class**. 

By declaring a field public, you can ensure the field is always there.

An example was shown above for reference.

:::info

Note that you can access fields' values within the constructor.

This is due to the instance fields of a class being added *before* the respective constructor runs.

:::

<iframe
    src="https://hlab.app/s/docs/instanceex1_hbook"
    width="100%"
    height="400px"/>

---

### Public `static` Methods

When `static` is used with a method for a class, that method must be called by the class itself, not an instance.

Here's an example of a `static` method:

<iframe
    src="https://hlab.app/s/docs/instanceex3_hbook"
    width="100%"
    height="400px"/>

---

### Public Instance Methods

When a method is an instance method, it is available to every *instance*. 

- Trying to access it statically will fail, like the reverse situation.

Here is an example:

<iframe
    src="https://hlab.app/s/docs/instanceex4_hbook"
    width="100%"
    height="400px"/>

Inside instance methods, `this` refers to the instance itself. 

For `static` methods, `this` refers to the `constructor`'s values.

:::info

'Getters' and 'setters' are special methods that bind to a class property.

They are called when that property is accessed or set. 

:::

:::tip

Overall classes are a *long and relatively complicated* topic. This is the public version. 

There is also private features for classes. 

However, one should make sure to understand the differences between static and instance fields and methods.

:::

---