---
sidebar_position: 4
---

import { MathJax, MathJaxContext } from 'better-react-mathjax'


# Private Class Features

Private class members (methods and properties) are ones such that only the functions/class itself can access them.

To make a member private, simple prefix it with '#' like this: 

```js
let #msg = "hello this is a private message";
```

:::caution

Private features may not yet be implemented on Hedgehog Lab. 

:::

An example:

<iframe
    src="https://hlab.app/s/docs/privateex1_hbook"
    width="100%"
    height="400px"/>

Note that private fields include both instance and static versions (just like public).

:::info

Note that one can use the `in` operator to detect missing private fields or methods. 

It will return `true` if the private field or method exists, `false` otherwise.

:::

Similarly to public fields, private fields are added at construction time in the base class:

<iframe
    src="https://hlab.app/s/docs/privateex2_hbook"
    width="100%"
    height="500px"/>

:::tip

Private static fields are very similar to public ones. 

- See [Public Classes](/Classes/Public Class Fields.md) for examples.

:::

---

### Private Instance Methods 

They are methods available on class **instances** not the class itself (that's static).

And access is restricted similar as private instance *fields*:

- Only accessible to the class its in. Even subclasses don't have access.

The syntax is the same as fields: add a '#' before the method name:

<iframe
    src="https://hlab.app/s/docs/privateex3_hbook"
    width="100%"
    height="500px"/>

:::info 

Private instance methods can also be 'getters' or 'setters'.

:::

---