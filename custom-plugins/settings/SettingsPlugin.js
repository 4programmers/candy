var CandyShop = (function(self) { return self; }(CandyShop || {}));

/**
 * SETTINGS:
 * candy-nosound - Sound on private message
 * sound-mention - Sound when someone mention us in chat (@nickname)
 * notify-pw - Notification for private message
 * notify-mention - Notification for mention
 * inline-images - Images in chat
 * TODO: flash-pw - Flashing browser window on private message
 * TODO: flash-mention - Flashing browser window on mention
 */


CandyShop.Settings = (function(self, Candy, $) {
    self.init = function(){
		$("#chat-toolbar").append("<a href='#openModal'><li id='chat-settings-control' data-tooltip='Settings'></li></a>");
		$("#chat-sound-control").remove();

		$.ajax({
			url: 'custom-plugins/settings/settings-body.html',
			async: false,
			success: function(data) {
				$("#candy").append(data);
			}
		});

		var inputs = $("#openModal :input");
		for (var i = 0; i < inputs.length; i++) {
			$(inputs[i]).click(self.onSettingClick);

			if (Candy.Util.cookieExists(inputs[i].id)) {
				$(inputs[i]).click();
			}
		}
    };

    self.onSettingClick = function() {
		if (this.checked) {
			Candy.Util.deleteCookie(this.id);
		} else {
			Candy.Util.setCookie(this.id, "1", 365);
		}
    };

    return self;
}(CandyShop.Settings || {}, Candy, jQuery));
