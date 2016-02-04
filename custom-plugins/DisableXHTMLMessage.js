/*
 * Giphy plugin
 * Requires inline-images plugin
 * Use: CandyShop.Giphy.init();
 */

/* global alert, Candy, jQuery, $build */

var CandyShop = (function(self) { return self; }(CandyShop || {}));

CandyShop.DisableXHTMLMessage = (function(self, Candy, $) {

    /** Function: init
     * Initializes giphy
     */
    self.init = function(){

        $(Candy).on('candy:view.message.before-show', function(e, args) {
            try {
				args.xhtmlMessage = args.message;
            } catch (ex) {
                // Without an exception catcher, the page will reload and the user will be logged out
                Candy.Core.log(ex);
            }
        });
    };

    return self;
}(CandyShop.DisableXHTMLMessage || {}, Candy, jQuery));
