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
    addButtonClass:   'btn btn-success',
    addButtonContent: '<i class="fa fa-plus"></i> add',
    delButtonClass:   'btn btn-default remove',
    delButtonContent: '<i class="fa fa-trash-o"></i>',
    excludeDelete:    null,
    activeSelect2:    false,
    select2CssClass:  's2',
    callback:         null
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

Use with Select2
----------------

Setting ``activeSelect2`` to ``true``, you can active [Select2](http://select2.github.io/select2/)
on your select. The default class is ``s2``, but you can customize it in the ``select2CssClass``
option.

Use a callback
--------------

If you need to call a function on the new content added by this plugin, just pass an anonymous
function to ``callback`` option.

This example will update the [Webshim polyfill](http://afarkas.github.io/webshim/demos/index.html):

``` js
$('body').sfCollectionTable(['myobject_mycollection'], {
    callback: function () {
        $('#myobject_mycollection').updatePolyfill();
    }
});
```

Styles
------

If you use default settings with Symfony (e.g. Bootstrap theme), you can use these styles:

``` ccs
div#myobject_mycollection { display: table; border-spacing: 5px; }
div#myobject_mycollection > div.form-group, div.label-row { display: table-row; }
div#myobject_mycollection .control-label { display: none; }
div#myobject_mycollection div.form-group div.form-group, .label-empty-cell { display: table-cell; margin: 1px; }
div#myobject_mycollection a.remove { display: table-cell; margin: 0 20px 10px 0; }
div#myobject_mycollection .form-control { display: inherit }
```