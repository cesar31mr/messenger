# Instalación

Para la instalación del framework de Angular se tuvo que ejecutar en un cmd como admin el siguiente comando:

`npm install -g @angular/cli`

La creación del proyecto "Front" se hizo con el siguiente comando (una vez instalado Angular):

`ng new front`

Se instalan los siguietes paquetes:

* push.js -> Se utiliza para recibir notificaciones de nuevo mensaje
* socket.io-client -> Socket para la comunicación desde el cliente

El comando quedó de la siguiente manera:

`npm i push.js socket.io-client --save`

Para ejecutar el proyecto y validar que se instaló de manera correcta se usó el comando:

`ng serve`

Para crear un componente en la carpeta "components" se usará el siguiente comando:

<Este comando quedó obsoleto>:
`ng g c components/registro --spec=false`

<Ahora se usará este otro>:
`ng g c components/registro --skip-tests`



******************************************************************************************************************************
******************************************************************************************************************************
******************************************************************************************************************************
******************************************************************************************************************************




# Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
