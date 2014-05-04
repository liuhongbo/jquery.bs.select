(function ($) {
    $.fn.bsselect = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exists.');
        }
    };

    var methods = {},
     
    defaults = {        
        image: 'left', //left, right
        pull: false //true, false
    }

    methods.init = function (options) {
        var settings = $.extend(defaults, options);

        return this.each(function () {
            var select = ($(this).prop('tagName') == 'SELECT') ? $(this) : $(this).find('select');
            if (select.length == 0) return;

            var bsselect = $('<div></div>');

            bsselect.addClass('dropdown');
            if (select.hasClass('form-control')) {
                bsselect.addClass('form-control');
            }

            var toggle = $('<a role="button" data-toggle="dropdown" data-target="#" href="#" style="display:block;"></a>');
            var selected = select.find('option:selected');
            if (selected.length == 0) {
                selected = select.find('option').first();
            }
            var toggleText = $('<span></span>').text(selected.text());
            toggle.append(toggleText);            

            var img = $('<img/>').attr('src', selected.attr('data-img-src'));
            if (settings.image == 'left') {
                toggle.prepend(' ');
                toggle.prepend(img);
            }
            else {
                toggle.append(' ');
                toggle.append(img);
            }
           
            toggle.append(' <span class="caret pull-right"></span>')

            bsselect.append(toggle);

            var ul = $('<ul class="dropdown-menu" role="menu" style="width:100%;"></ul>');
            
            select.find('option').each(function () {
                var option = $(this);
                var li = $('<li></li>');
                var a = $('<a tabindex="-1" href="#"></a>');
                a.text(option.text())
                a.attr('data-select-value', option.val());

                var img = $('<img/>').attr('src', option.attr('data-img-src'));

                if (settings.image == 'left') {
                    a.prepend(' ');
                    a.prepend(img);
                    if (settings.pull) {
                        img.addClass('pull-left');
                        a.addClass('text-right');
                    }
                }
                else {
                    a.append(' ')                    
                    a.append(img);
                    if (settings.pull)
                        img.addClass('pull-right');
                }

                li.append(a);
                
                ul.append(li);
            });

            ul.find('a').on('click', function () {
                var a = $(this);
                toggle.find('span').first().text(a.text());
                toggle.find('img').attr('src',a.find('img').attr('src'))
                select.val(a.attr('data-select-value'));               
            });

            bsselect.append(ul);

            select.after(bsselect);
            select.hide();
        });
    }

})(jQuery);