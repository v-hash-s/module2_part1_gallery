# module1-part3-gallery.JS

## Vlasta Stelmakh

### About this project:

#### This project was developed for educational purpose. It consists of authorization form and gallery. User inputs email and password. If those two are correct, the user is allowed to proceed to the gallery page.

### Project structure:

* /src
  * gallery.ts
  * login.ts
* /public
  * gallery.html
  * gallery.js
  * index.html
  * login.js
  * README.md
* tsconfig.json

### Project structure description: 

#### tsconfig.json

> Configuration for the typescript project

#### **/public**

#### gallery.html

> Html layout for gallery and buttons

#### gallery.js

> Compiled with tsc gallery.ts

#### login.html

> Html form for login

#### login.js

> Compiled with tsc login.ts

#### README.md

> Project description

#### **/src**

#### login.ts

> Functionality to authenticate user, if his email and/or password correct/valid

#### gallery.ts

> Functionality for fetching photos and creating gallery
