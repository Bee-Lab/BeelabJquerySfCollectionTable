(function ($) {
    "use strict";
    $.fn.sfCollectionTable = function (collections, options) {
        var settings = $.extend({
            addButtonClass:   "btn btn-success",
            addButtonContent: '<i class="fa fa-plus"></i> add',
            delButtonClass:   "btn btn-default remove",
            delButtonContent: '<i class="fa fa-trash-o"></i>'
        }, options), collection;

        function addTagFormDeleteLink($label) {
            var $removeFormA = $('<a class="' + settings.delButtonClass + '">' + settings.delButtonContent + '</a>');
            $label.before($removeFormA);
            $removeFormA.on('click', function (e) {
                e.preventDefault();
                $label.parent().remove();
            });
        }

        function moveUp($element) {
            $element.appendTo($element.parents('.form-group'));
            $element.remove();
        }

        function addTagForm($a) {
            var $collectionHolder = $a.parent('div').parent('div'),
                $newLinkLi = $('#c_' + $a.attr('id').replace(/add_tag_link_/, '')),
                prototype = $collectionHolder.data('prototype'),
                index = $collectionHolder.data('index'),
                newForm = prototype.replace(/__name__label__/g, index).replace(/__name__/g, index),
                $newFormLi = $(newForm);
            $collectionHolder.data('index', index + 1);
            $newLinkLi.before($newFormLi);
            addTagFormDeleteLink($newFormLi.find('label:first'));
            $collectionHolder.find('div.form-group div div.form-group').each(function () {
                moveUp($(this));
            });
            $collectionHolder.find('div.form-group div').not('.form-group').remove();
        }

        for (collection in collections) {
            var $collectionHolder = $('#' + collections[collection]),
                $addTagLink = $('<a href="#" id="add_tag_link_' + collection + '" class="' + settings.addButtonClass + '">' + settings.addButtonContent + '</a>'),
                $newLinkLi = $('<div id="c_' + collection + '" class="clearfix"></div>').append($addTagLink);
            $collectionHolder.append($newLinkLi);
            $collectionHolder.data('index', $collectionHolder.find(':input').length);
            $collectionHolder.children('div.form-group').find('label:first').each(function () {
                addTagFormDeleteLink($(this));
            });
            var $labelRow = $('<div class="label-row">');
            $collectionHolder.find('div:first').before($labelRow);
            $labelRow.append($('<label class="label-empty-cell">').text(''));
            $collectionHolder.find('div > div:first label').each(function () {
                $(this).show().css('display', 'table-cell').appendTo($labelRow);
            });

            $collectionHolder.find('div.form-group div div.form-group').each(function () {
                moveUp($(this));
            });
            $collectionHolder.find('div.form-group div').not('.form-group').remove();

            $('a#add_tag_link_' + collection).on('click.coll_' + collection, function (e) {
                e.preventDefault();
                addTagForm($(e.target));
            });
        }

        return this;
    };
}(jQuery));