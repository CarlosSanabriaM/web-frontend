# Development: Documentation

This page explains how to **modify the documentation**.

The documentation is generated using [compodoc](https://compodoc.app),
which uses [GitHub flavoured Markdown](https://guides.github.com/features/mastering-markdown/) as its markup language.



## Dependencies

Compodoc 1.1.8 is required for modifying the documentation.

Install compodoc 1.1.8 via npm: `npm install -g @compodoc/compodoc@1.1.8`

Compodoc 1.1.9 has a bug that fails to render source code blocks in Markdown files, 
so for the moment better install compodoc 1.1.8. 
See this [issue](https://github.com/compodoc/compodoc/issues/750) for more info.



## How to modify the documentation

Compodoc creates a documentation web page based on the **JSDoc** documentation in the source code. 
See [Devdocs JSDoc page](https://devdocs.io/jsdoc/) for more info about JSDoc.

Each new Angular component | service | directive | module must be documented using JSDoc.

For the cases were a **more complete explanation** is needed, a Markdown file can be created inside
the root folder of the component | service | directive | module. It must be called xxx.component.md |
xxx.service.md | xxx.directive.md | xxx.module.md respectively. 
See *'Documentation of each component, module, directives etc'* section of 
[Compodoc Tips and Tricks page](https://compodoc.app/guides/tips-and-tricks.html) for more info.

**Additional documentation** (like this page) can also be added. 
A Markdown file must be included in the additional-documentation-sources folder, 
and the name of that file must also be included in the additional-documentation-sources/**summary.json** file.
This is better explained in the *'Additional documentation'* section of 
[Compodoc Tips and Tricks page](https://compodoc.app/guides/tips-and-tricks.html).



## Render and serve the documentation

To render and serve the documentation follow this steps:

1. Move to the project root folder: `cd <project-root-folder>`
2. Execute this command: `./generate-and-serve-documentation.sh`
3. Access the HTML page in [http://127.0.0.1:8080/](http://127.0.0.1:8080/).

The generate-and-serve-documentation.sh executes the following command: 
`compodoc -p tsconfig.json -s --assetsFolder images --includes additional-documentation-sources`.

After generating the documentation, it's not needed to serve it to visualize it. 
It can be accessed directly, opening the **documentation/index.html** file in a web browser.

For more info about compodoc, visit the [Compodoc Usage page](https://compodoc.app/guides/usage.html).
