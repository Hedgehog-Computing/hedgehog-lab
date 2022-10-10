---
sidebar_position: 1
---

# Modules

For most of the programming languages in the world, users need to install a package manager (**npm/yarn** for **JavaScript**, **pip/condo** for **Python**, **cargo** for **Rust**) to install a package/module before using/compiling in the source code.

In the Hedegehog Lab, users do not need to install any packages or modules. All the packages and modules are configured automatically during runtime. No additional installations or configurations are needed, if you can add/deploy your module in following ways:

### Import registered modules `module: function`

Hedgehog Lab has a built-in module registry, which is a list of modules that are registered in the registry. You can import modules from the registry by using the `import` statement.

```js
*import my_module : my_function
my_function()
```
Here is an example of importing a module from the registry:


<iframe src="https://hlab.app/s/docs/demo_module_package"
    width="100%"
    height="300px">
  </iframe>


For how to add your module/package to the registry, please refer to [Hedgehog Package Manager](https://github.com/Hedgehog-Computing/hedgehog-lab/tree/dev/hedgehog-package-manager).

---

### Import as `@username/module`

If you are a registerd user at Hedgehog Lab [https://hlab.app](https://hlab.app), you can save your own modules by using the `@username/module` syntax, and everyone can import your modules by using the `import` statement.

```js
*import @my_user_id/demo_module
```

Here is an example:

<iframe src="https://hlab.app/s/docs/demo_user_module"
    width="100%"
    height="300px">
  </iframe>

---
### Import from the URL

The easiest way to import a module is to import it from the URL (like Github Gist). Hedgehog Lab will automatically download and install the module for you.

```js
*import "https://pkg.com/your_module.hhs"
```

In this way, the source code of the module will be downloaded and cached by the Hedgehog runtime. The module will be available for the rest of the session.

<iframe src="https://hlab.app/s/docs/demo_module_url"
    width="100%"
    height="300px">
  </iframe>

---

### Import from Github Repo 

You can also import a module from a Github repo as `*github username/repo/branch/path`. Hedgehog Lab will automatically download and install the module for you. 

For example, if the module is in the `main` branch of the `hedgehog-lab` repo, with path `./my_lib/demo_module.hhs`, you can import it by using the following statement:

```js
*github hedgehog-computing/hedgehog-lab/main/my_lib/demo_module.hhs
```

Here is an example:
<iframe src="https://hlab.app/s/docs/demo_module_github"
    width="100%"
    height="300px">
  </iframe>