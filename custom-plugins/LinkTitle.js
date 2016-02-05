/*
 * Giphy plugin
 * Requires inline-images plugin
 * Use: CandyShop.Giphy.init();
 */

/* global alert, Candy, jQuery, $build */

var CandyShop = (function(self) { return self; }(CandyShop || {}));

CandyShop.LinkTitle = (function(self, Candy, $) {

    /** Function: init
     * Initializes giphy
     */
    self.init = function(){

        $(Candy).on('candy:view.message.before-show', function(e, args) {
            try {
               var message = args.message;

				if ((message.indexOf("<a href") === -1) || (message.indexOf("<img") >= 0)) {
					return;
				}

				var url = message.match(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})[^\"]/)[0].replace('" ', '');
				if (url === null) {
					return;
				}

				var title = getLinkTitle(url);
				if (title === null) {
					return;
				}

				args.message = message.replace(">" + url + "<", ">" + title + "<");

            } catch (ex) {
                // Without an exception catcher, the page will reload and the user will be logged out
                Candy.Core.log(ex);
            }
        });
    };

    /** Function: giphy
     * Command description
     *
     * Parameters:
     *    (String) args Description
     */
    getLinkTitle = function(url) {
        var result = null;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
			timeout: 3000,
            success: function(data) {
                result = $(data).filter('title').text();
            }
        });
        return result;
    };

    return self;
}(CandyShop.LinkTitle || {}, Candy, jQuery));
