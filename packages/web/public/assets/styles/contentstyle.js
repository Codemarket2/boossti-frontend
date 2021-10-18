/* 
Content Styles ver.1.1
*/

(function ($) {
    var plugin;

    $.contentstyle = function (options) {

        var defaults = {
            cssPath: 'assets/styles/',
            onChange: function (css) { },
            onReset: function (css) { },
            showFrom: 'left',
            bodySlide: true
        }

        plugin = this;

        plugin.settings = {};

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            if (jQuery('.panel-styles').length == 0) {
                jQuery('body').append('<div class="panel-styles ' + (plugin.settings.showFrom === "left" ? "from-left" : "from-right") + ' no-touch">' +
	                '<div class="panel-container">' +
		                '<iframe id="ifrStyles" style="width:100%;height:100%;border: none;display: block;" src="' + this.settings.cssPath + 'blank.html"></iframe>' +
                        '<div class="reset-style" title="Reset">↺</div>' +
                    '</div>' +
                '</div>');
            }
        };

        plugin.init();
    }


    $.contentstyle.open = function () {
        $('.panel-styles').addClass('is-visible');

        $('#ifrStyles').attr('src', plugin.settings.cssPath + 'preview.html');

        
        if (plugin.settings.showFrom === "left") {

            $('.reset-style').css('right', '-80px');
            $('.reset-style').css('left', 'auto');

            if ($(window).width() >= 1140 && plugin.settings.bodySlide) {
                jQuery('body').animate({
                    marginLeft: '+=' + $('.panel-container').css('width')
                }, 300);
            }

        } else {

            $('.reset-style').css('left', '-80px');
            $('.reset-style').css('right', 'auto');

            if ($(window).width() >= 1140 && plugin.settings.bodySlide) {
                jQuery('body').animate({
                    marginRight: '+=' + $('.panel-container').css('width')
                }, 300);
            }
        }
        

        //close styles
        $('.panel-styles').unbind('click');
        $('.panel-styles').on('click', function (event) {
            if ($(event.target).is('.panel-styles') || $(event.target).is('.panel-close')) {

                if ($(window).width() >= 1140 && plugin.settings.bodySlide) {
                    if (plugin.settings.showFrom === "left") {
                        jQuery('body').animate({
                            marginLeft: '-=' + $('.panel-container').css('width')
                        }, 300);
                    } else {
                        jQuery('body').animate({
                            marginRight: '-=' + $('.panel-container').css('width')
                        }, 300);
                    }
                }

                $('.panel-styles').removeClass('is-visible');
                event.preventDefault();
            }
        });

        $('.reset-style').unbind('click');
        $('.reset-style').on('click', function (event) {
            $.contentstyle.apply('content-000.css');
            plugin.settings.onReset();
        });

    };

    $.contentstyle.apply = function (cssFile) {

        plugin.settings.onChange(plugin.settings.cssPath + cssFile);

    };

    $.contentstyle.close = function () {

        $('.panel-styles').removeClass('is-visible');

    };

} (jQuery));