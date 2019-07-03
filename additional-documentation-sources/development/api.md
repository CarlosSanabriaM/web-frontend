# Development: API

This page explains:

* The [style guide](#style-guide) used in the project
* The most [important libraries](#important-libraries) used in the source code
* The [directory structure and important files](#directory-structure-and-important-files)
* [Important source code details](#important-source-code-details)
* Tips to [extend the library](#extend-the-library)



## Style guide

The style guide used in this project is the [Angular Style Guide](https://angular.io/guide/styleguide).



## Important libraries

### Angular Material

Material Design components for Angular.

[This is a direct link to the Angular Material documentation.](https://material.angular.io)


### Bootstrap

Popular framework for building responsive, mobile-first sites.

[This is a direct link to the Bootstrap documentation.](https://getbootstrap.com/docs/4.3/getting-started/introduction/)


### NG Bootstrap

Implements some of the Bootstrap components as Angular components.

[This is a direct link to the NG Bootstrap documentation.](https://ng-bootstrap.github.io)


### NG Chartist

Used to create the histogram.

[This is a direct link to the NG Chartist documentation.](https://willsoto.github.io/ng-chartist/docs/)


### Rxjs

Library for reactive programming using Observables.

[This is a direct link to the Rxjs documentation.](https://rxjs-dev.firebaseapp.com)



## Directory structure and important files

* **additional-documentation-sources** folder: Contains README files with additional documentation, such as Deployment or Development.
* **dist** folder: Folder generated after executing `ng build`. Contains the generated build artifacts.
* **documentation** folder: Folder generated after executing `./generate-and-serve-documentation.sh`. Contains the documentation files.
* **e2e** folder: Contains source files for a set of end-to-end tests that correspond to the root-level application, 
  along with test-specific configuration files.
* **images** folder: Contains some images used in the README.md and the documentation.
* **node_modules** folder: Provides npm packages to the entire workspace. Workspace-wide node_modules dependencies are visible to all projects.
* **src** folder: Source files for the root-level application project. It contains all the source code, and has the following elements:

   * **app** folder: Contains the component files in which the application logic and data are defined.
   
      * **dtos** folder: Contains some interfaces that represent DTOs (Data Transfer Objects).
      * **footer** folder: Contains the Footer Component.
      * **header** folder: Contains the Header Component.
      * **shared** folder: Contains the Shared Module, with some components | directives used by other modules.
      * **text** folder: Contains the Text Module.
      * **topics** folder: Contains the Topics Module.
      * **app.component.xxx**: Files associated with the with the root AppComponent.
      * **app.module.ts**: Defines the root module, named AppModule, that tells Angular how to assemble the application.
      * **utils.service.ts**: Service with some utilities.
      * **angular-bootstrap.module.ts**: Module used to import all the NG Bootstrap components that will be used in the application..
      * **angular-material.module.ts**: Module used to import all the Angular Material components that will be used in the application..
      
   * **assets** folder: Contains image and other asset files to be copied as-is when you build your application.
   * **environments** folder: Contains build configuration options for particular target environments.
     By default there is an unnamed standard development environment and a production ("prod") environment. 
     Additional target environment configurations can be defined.
   * **favicon.ico**: An icon to use for this application in the bookmark bar.
   * **styles.css**: Global styles.
   

* **.dockerignore**: Contains the files and folders ignored by the docker build context. Those files are not copied to the docker image.
* **.editorconfig**: Configuration for code editors. See [EditorConfig](https://editorconfig.org/).
* **.gitignore**: Contains the files and folders ignored by git.
* **angular.json**: CLI configuration defaults for all projects in the workspace. 
  For details, see [Angular Workspace Configuration](https://angular.io/guide/workspace-config).
* **Dockerfile**: Contains the steps for creating the docker image to run the backend.
* **generate-and-serve-documentation.sh**: Script that generates and serves the documentation.
* **nginx.conf**: Configuration for the NGINX web server where the Angular app will be served in production. 
  See [NGINX Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf) for a complete example.
* **package.json**: Configures npm package dependencies that are available to all projects in the workspace. 
  See [npm documentation](https://docs.npmjs.com/files/package.json) for the specific format and contents of this file.
* **package-lock.json**: Provides version information for all packages installed into node_modules by the npm client. 
  See [npm documentation](https://docs.npmjs.com/files/package-lock.json) for details. 
* **README.md**: Contains a quick explanation of the project.
* **tsconfig.json**: Default [TypeScript](https://www.typescriptlang.org/) configuration for projects in the workspace.
* **tslint.json**: Default [TSLint](https://palantir.github.io/tslint/) configuration for projects in the workspace.


See [Angular File structure](https://angular.io/guide/file-structure) for a more complete explanation 
of the Angular basic files and folders.



## Important source code details

### Modules

The AppModule is divided into 2 modules: TopicsModule and TextModule, that represent the topics section
and the text section respectively. 

If new functionality is going to be included in one of those 2 sections, it must be included in the
corresponding module (TopicsModule for the topics section and TextModule for the text section).

### Routing

Currently, the application doesn't need [Angular Routing](https://angular.io/guide/router), 
because it's very simple and all can be done in one view. 

If more views are needed, then Angular Routing must be used.



## Extend the library

This section gives information about how to extend the library functionality.

### Recommended IDE

The recommended IDE is [WebStorm](https://www.jetbrains.com/webstorm/). 
The folder to be selected as a project must be the project root folder (web-frontend, not web-frontend/src).
