sfCollectionTable
=================

A jQuery plugin to get nice table-like divs in your form collection with Symfony.

For now, it's working only with a Bootstrap template.

Default options use Font Awesome icons (but you can change it).

Usage
-----

* include jQuery
* include ``sfCollectionTable.js``
* in your JavaScript file do something like in the following example

Example
-------

``` js
$(document).ready(function () {
    'use strict';
    // insert here the IDs of your collections
    var collections = ['myobject_mycollection'];
    $('body').sfCollectionTable(collections);
});
```

Options
-------

Here are default options, customize at will:

``` js
{
    addButtonClass:   "btn btn-success",
    addButtonContent: '<i class="fa fa-plus"></i> add',
    delButtonClass:   "btn btn-default remove",
    delButtonContent: '<i class="fa fa-trash-o"></i>',
    excludeDelete:    null
}
```

excludeDelete
-------------

This is a special option, that allow to exclude some rows from being deleted.
You must define a function with ``$label`` as parameter, where ``$label`` is a jQuery instance
of the label of a row. You can use it to discriminate rows you want to be deletable.

Example:

``` js
function ($label) {
    var aField = $label.parent('div').find('input[type="hidden"]').val();

    return aField > 0;
}
```