# Modules

Modules are a way to split up your application logic into managable, modular pieces. 

* Modules do not
    * share code.
    * communicate directly
    * break your application if removed 
* Modules consist of
    * templates
    * views
    * controller.js     - most of the module logic
    * module.js         - entry point of the module
        * router        - all of the routing for this module is contained here
        * commands      - set up commands to handle events from other modules
        * reqres        - set up events to return data to other modules
    * entities.js       - backend communcation, DAO
    * helpers.js        - handlebar helpers

We have modules for every section of our application, for example: "home", "auth", "settings" etc.


## Creating a new module
-------------

To scaffold out a new module simply open your console and type

```
yo generator-marionette:module
```

The module will be created in the folder frontend/app/modules