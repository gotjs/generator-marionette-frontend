# Modules

Modules are a way to split up your application logic into managable, modular pieces. 

* Modules do not
    * share code.
    * communicate directly
    * break your application if removed 
* Modules consist of
    * templates
    * views
    * module.js         - entry point of the module
        * logger        - sets up the logger + controller and router for this module
        * commands      - set up commands to handle events from other modules
        * reqres        - set up events to return data to other modules
    * controller.js     - most of the module logic
    * router.js        -  all of the routing for this module is contained here



We have modules for every section of our application, for example: "home", "auth", "settings" etc.


## Creating a new module
-------------

To scaffold out a new module simply open your console and type

```
yo generator-marionette-frontend:module
```

The module will be created in the folder frontend/app/modules
