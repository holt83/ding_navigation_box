(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			var prefix = "#ding-navigation-box-admin";
			$(prefix + " .edit-item-links a").hide();
			var activeItem = settings.dingNavigationBox.activeItemPosition;
			$(prefix + " .edit-item-links a:nth-of-type(" + activeItem + ")").show();
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function() {
					$(prefix + " .edit-item-links a").hide();
					$(prefix + " .edit-item-links a:nth-of-type(" + (index + 1) + ")").show();					
				})
			});	
		}
	}
})(jQuery);