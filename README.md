generator-opus
==============

### Setup

```
npm install -g yo
git clone https://github.com/opus-online/generator-opus.git
npm link
```

### Creating a new project

```
mkdir example && cd example
yo opus
grunt
```

> Now go to http://localhost:9001/development/

### Creating a new plugin

```
yo opus:plugin
```

### Creating a new module

```
yo opus:module
```

### Want to see how your site looks like in production?
```
grunt --target=staging
```

