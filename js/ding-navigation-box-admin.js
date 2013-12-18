(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			var prefix = "#ding-navigation-box-admin";
			/*
			$(prefix + " .edit-item-links a").hide();
			var activeItem = settings.dingNavigationBox.activeItemPosition;
			$(prefix + " .edit-item-links a:nth-of-type(" + activeItem + ")").show();*/


			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function() {
					var dniid = $(this).data("dniid");
					var title = $(".ding-navigation-box a:nth-of-type(" + (index + 1) + ") .full").text();
					$("#ding-navigation-box-admin .edit-item-link a").text("Edit " + title);
					//$("#ding-navigation-box-admin .edit-item-link a").attr("href", dniid);
				})
			});	
		}
	}
})(jQuery);