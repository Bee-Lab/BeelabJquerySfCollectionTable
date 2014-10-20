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
    delButtonContent: '<i class="fa fa-trash-o"></i>'
}
```