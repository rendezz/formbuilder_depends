# Formbuilder Depends

A plugin of sorts to https://github.com/kevinchappell/formBuilder to create dependencies between fields

## Description

This plug for formbuilder adds the ability to depend the visibility and validation of a field on a selectbox, checkbox or radio button from the form.  It comprises of a UI picker which allows you to select what you would like to depend on, (checkbox/select etc...) and then loads up the various options for you to choose from.

What this results in from the renderer point of view is a if you check a checkbox or select an option that has something that depends on it, it will become visible/valid, if you uncheck/unselect then it hides and becomes disabled (to remove its validation)

The best way to see how it works is;

  * Builder: load the src/build.html in a browser 
  * Renderer: load the src/render.html in a browser 
  
## Builder Setup
  
Under normal circumstances you may have the following code to show the builder

```javascript
myFormBuilder = div.formBuilder(
            {
                // add your formbuilder setup here
            }
        );
```
So instead you would wrap that in a method call which merges in the the formbuilder_depends setup

```javascript
myFormBuilder = div.formBuilder(
            addDependsOn({
                // add your formbuilder setup here
            })
        );
```
You will also need the modal id="modal-form-dependson" (get it from the build.html demo) somewhere in your HTML, this is used to render the dependency picker

## Render Setup

```html
<form id="public_form" target="#" method="POST" class="needs-validation">
  <div id="fb-render">

  </div>
</form>
```

```javascript
    let form = $('#fb-render').formRender({
            // add your formbuilder render setup here
    });
```
The javascript just gets a methodcall afterwards on the enclosing form.  Which allows it to run through the form and bind the dependencies.

```javascript
    let form = $('#fb-render').formRender({
            // add your formbuilder render setup here
    });
    setupDependsOn(document.getElementById('public_form'));
```
## Conclusion

Happy Hunting
