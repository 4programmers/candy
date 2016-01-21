/*
 * Giphy plugin
 * Requires inline-images plugin
 *
 * CandyShop.Giphy.init();
 */
 
/* global alert, Candy, jQuery, $build */
 
var CandyShop = (function(self) { return self; }(CandyShop || {}));
 
CandyShop.Giphy = (function(self, Candy, $) {
 
    /** Function: init
     * Initializes giphy
     */
    self.init = function(){
 
        $(Candy).on('candy:view.message.before-send', function(e, args) {
            try {
                // (strip colors)
                var input = args.message.replace(/\|c:\d+\|/, '');
 
                if (input[0] !== '/') {
                    return;
                }
                var match = input.match(/^\/([^\s]+)(?:\s+(.*))?$/m);
                if (match === null) {
                    return;
                }
 
                var command = match[1];
                var data = match[2];
 
                if (command === 'giphy') {
                    args.message = self[command](data);
                    // CandyShop.InlineImages.handleBeforeShow(e, args);
                    // CandyShop.InlineImages.handleOnShow(e, args);
                }
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
    self.giphy = function(args) {
        args = args.replace(/\s/g, '+');
        var url = 'https://api.giphy.com/v1/gifs/search?q=' + args + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0';
        var result;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            success: function(data) {
                result = data.data[0].images.fixed_height_small.url;
            }
        });
        return result;
    };
 
    return self;
}(CandyShop.Giphy || {}, Candy, jQuery));
