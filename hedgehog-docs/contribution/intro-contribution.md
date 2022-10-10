# Contribution 

*Thank you for reading this book!*

### Contributing to this book

1.  Fork and `git clone` the repository at [https://github.com/Hedgehog-Computing/hedgehog-lab](https://github.com/Hedgehog-Computing/hedgehog-lab)

```bash
git clone https://github.com/Hedgehog-Computing/hedgehog-lab.git
```

2.  Change directory to `hedgehog-docs` folder, run `yarn` and then `yarn start` after `yarn` is installed

```bash
cd ./hedgehog-docs
yarn
```

3. Start debugging/editing mode on your local server at **https://localhost:3000** 

```bash
yarn start
```

or build a static book site
```bash
yarn build
```

4.  Commit and submit pull request

---

### Basic features about the book

-  This book is developed with Docusaurus [https://docusaurus.io/](https://docusaurus.io/) with both **markdown** and **MDX** supported

-  To add an **MDX** page:

    - Add the file `my_chapter.mdx` to the directory
    - Install necessary packages locally at `./hedgehog-docs` by 
    ```bash
    yarn add my_package
    ```
    - Import packages at the beginning of `your_chapter.mdx` 
    ```bash
    import {my_module} from my_package
    ```

- To add images:
    - Add the image files at `../static/img/{pictureFileName}`
    - Display the image: `![Description](/img/{pictureFileName})`

- To add a reference link: `[Display text](url)`

- Manage your code block

````md
add an embedded code block `in this way` or add a standalone code block

```js
print('A stand alone code block')
```
````

**Adding a code snippet:**

Add an iframe element with the source being your snippet link:

```html
<iframe
    src="snippet_link"
    width="100%"
    height="600px"\>
```

---

## We appreciate your time and the community.


**Contributors:**

- Xinran Wang  [ ![GithubIcon](../static/img/githubIcon_32x32.png)](https://github.com/lidangzzz) **GitHub**

- Jason Reynolds  [ ![GithubIcon](../static/img/githubIcon_32x32.png)](https://github.com/Gaoooooo) **GitHub**

---
