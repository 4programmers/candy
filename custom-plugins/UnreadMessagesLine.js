/*
 * Giphy plugin
 * Requires inline-images plugin
 * Use: CandyShop.Giphy.init();
 */

/* global alert, Candy, jQuery, $build */

var CandyShop = (function(self) { return self; }(CandyShop || {}));

CandyShop.UnreadMessagesLine = (function(self, Candy, $) {

    /** Function: init
     * Initializes giphy
     */
    self.init = function(){
        $(Candy).on('candy:view.message.before-show', function(e, args) {
		   if (!document.hasFocus() && self.wasFocusOnUnread) {
			   $("li.unread").removeClass("unread");
			   $(".message-pane li").last().addClass("unread");
			   self.wasFocusOnUnread = false;
		   }
        });

		$(document).focusin(function(e) {
			self.wasFocusOnUnread = true;
			console.log("focus");
		});
    };

	self.wasFocusOnUnread = false;

    return self;
}(CandyShop.UnreadMessagesLine || {}, Candy, jQuery));
