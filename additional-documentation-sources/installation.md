# Installation

This page contains the steps to install the required elements to execute or develop the web-frontend project.
The steps are following:
1. Install Node.js
2. Install Angular CLI
3. Install the project dependencies


## Install Node.js

Angular requires Node.js version 10.9.0 or later.

* To check your version, `run node -v` in a terminal/console window.
* To get Node.js, go to [nodejs.org](https://nodejs.org/).

Node.js also installs npm.

To check that you have the npm client installed, `run npm -v` in a terminal/console window.


## Install Angular CLI

Angular CLI can be used to create projects, generate application and library code, 
and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

To install the CLI using npm, open a terminal/console window and enter the following command:

```bash
npm install -g @angular/cli
```

## Install the project dependencies

The project dependencies are listed in the [Dependencies](../dependencies.html) page.

To install a dependency, execute the following command:
                                      
```bash
npm install --save <dependency>
```

This will install the dependency in the node_modules folder, and add it to the dependencies section of the package.json file.

**Note:** As of npm 5.0.0, installed modules are added as a dependency by default, so the --save option is no longer needed. 
See [https://stackoverflow.com/a/19578808/11440772](https://stackoverflow.com/a/19578808/11440772) for more information.
