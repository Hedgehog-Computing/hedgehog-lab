# Contribute to this book

This book is written in Markdown, built with GitBook and served with Github Pages.

## Setup


Install GitBook command line tool via NPM:

```
$ npm install gitbook-cli -g
```

Install all plugins for this book:

```
$ gitbook install
```

Launch GitBook development server:

```
$ gitbook serve
```

Build a release version of Hedgehog Book at "_book" folder:

```
$ gitbook build
```

## LaTeX Support

This book contains **katex** plugin, which allows author to insert a block of LaTeX formula using ```$​$```, for example:

```
$​$
\int_{-\infty}^\infty g(x) dx
$​$
```

will be rendered in HTML as 

$$
\int_{-\infty}^\infty g(x) dx
$$

Also you can insert an inline piece of LaTeX using ```$​$```, for example ```$​$\frac{x}{y}$​$``` is rendered as $$\frac{x}{y}$$.

## Inline Hedgehog Lab with Sample Code

Since **responsive-iframe** plugin is added to this GitBook project, you can easily add a Hedgehog Lab with sample code using an HTML iframe tag. For example, the sample code is:

```js
let myString = "hello world!"
print(myString)
```

You can generate a link at [hhlab.dev](https://hhlab.dev) with the sample code above with "automatically execute" checked as [https://hhlab.dev/?code=let%20myString%20%3D%20%22hello%20world!%22%0D%0Aprint(myString)&auto_run=true](https://hhlab.dev/?code=let%20myString%20%3D%20%22hello%20world!%22%0D%0Aprint(myString)&auto_run=true).

Then you can insert the link into your book with the following iframe tage:

```
<iframe src="https://hhlab.dev/?code=let%20myString%20%3D%20%22hello%20world!%22%0D%0Aprint(myString)&auto_run=true" allowfullscreen width="1000" height="300" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>
```

in which the width and height attributes are set as 1000 and 300 respectively, with no frameborder, border, marginwidth and marginheight attributes. The iframe tag inserted to the book will be rendered as:

<iframe src="https://hhlab.dev/?code=let%20myString%20%3D%20%22hello%20world!%22%0D%0Aprint(myString)&auto_run=true" allowfullscreen width="1000" height="300" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

which will automatically execute the sample code when the iframe is loaded.