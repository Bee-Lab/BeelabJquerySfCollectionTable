(function ($) {
    "use strict";
    $.fn.sfCollectionTable = function (collections, options) {
        var settings = $.extend({
            addButtonClass:   "btn btn-success",
            addButtonContent: '<i class="fa fa-plus"></i> add',
            delButtonClass:   "btn btn-default remove",
            delButtonContent: '<i class="fa fa-trash-o"></i>',
            excludeDelete:    null,
            activeSelect2: false,
            select2CssClass: "s2"
        }, options), collection;

        function addTagFormDeleteLink($label, disabled) {
            var $removeFormA = $('<a class="' + settings.delButtonClass + '">' + settings.delButtonContent + '</a>');
            $removeFormA.attr('disabled', disabled);
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
            $collectionHolder.find('div.form-group div').not('.form-group').not('.checkbox').hide();
        }

        for (collection in collections) {
            var $collectionHolder = $('#' + collections[collection]),
                $addTagLink = $('<a href="#" id="add_tag_link_' + collection + '" class="' + settings.addButtonClass + '">' + settings.addButtonContent + '</a>'),
                $newLinkLi = $('<div id="c_' + collection + '" class="clearfix"></div>').append($addTagLink);
            $collectionHolder.append($newLinkLi);
            $collectionHolder.data('index', $collectionHolder.find(':input').length);
            $collectionHolder.children('div.form-group').find('label:first').each(function () {
                if (typeof settings.excludeDelete === 'function') {
                    addTagFormDeleteLink($(this), settings.excludeDelete($(this)));
                } else {
                    addTagFormDeleteLink($(this), false);
                }
            });
            var $labelRow = $('<div class="label-row">');
            $collectionHolder.find('div:first').before($labelRow);
            $labelRow.append($('<label class="label-empty-cell">').text(''));
            $collectionHolder.find('div > div:first label').each(function () {
                /* if label is for a checkbox, only "copy" label */
                if ($(this).parent('div').hasClass('checkbox')) {
                    var $cbLabel = $(this).clone();
                    $cbLabel.find('input').remove();
                    $cbLabel.css('display', 'table-cell').appendTo($labelRow);
                } else {
                    $(this).show().css('display', 'table-cell').appendTo($labelRow);
                }
            });

            $collectionHolder.find('div.form-group div div.form-group').each(function () {
                moveUp($(this));
            });
            $collectionHolder.find('div.form-group div').not('.form-group').not('.checkbox').hide();

            $('a#add_tag_link_' + collection).on('click.coll_' + collection, function (e) {
                e.preventDefault();
                var $target = e.target == this ? $(e.target) : $(e.target).parent('a');
                addTagForm($target);
                if (settings.activeSelect2) {
                    $("select." + settings.select2CssClass).select2();
                }
            });
        }

        return this;
    };
}(jQuery));
