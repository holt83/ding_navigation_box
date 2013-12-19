(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			var adminURI = settings.dingNavigationBoxAdmin.adminURI;
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function() {
					var dniid = $(this).data("dniid");
					var title = $(".ding-navigation-box a:nth-of-type(" + (index + 1) + ") .full").text();
					$("#ding-navigation-box-admin .edit-item-link a").text("Edit " + title);
					$("#ding-navigation-box-admin .edit-item-link a").attr("href", "/" + adminURI + "/edit/" + dniid);
				})
			});	
		}
	}
})(jQuery);