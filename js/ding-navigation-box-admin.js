(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			$(".content .edit-item-links a").hide();
			var activeItem = settings.dingNavigationBox.activeItemNumber;
			$(".content .edit-item-links a:nth-of-type(" + activeItem + ")").show();
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function() {
					$(".content .edit-item-links a").hide();
					$(".content .edit-item-links a:nth-of-type(" + (index + 1) + ")").show();					
				})
			});	
		}
	}
})(jQuery);