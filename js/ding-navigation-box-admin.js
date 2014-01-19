(function($) {

	Drupal.behaviors.dingNavigationBoxAdmin = {		
		attach: function(context, settings) {

			// Edit navigation item.
			var adminPath = settings.dingNavigationBox.adminPath
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function(e) {
					e.preventDefault;
					var dniid = $(this).data("dniid");
					var title = $(this).find(".full").text();
					$("#edit-item-link")
						.text("Edit " + title)
						.attr("href", "/" + adminPath + "/edit/" + dniid);
				})
			});

			// Slideshow
			var slideshowDemo = $("#slideshow-demo");
			slideshowDemo.click(function(e) {
				e.preventDefault();
				var dingNavigationBox = Drupal.behaviors.dingNavigationBox;
				var running = dingNavigationBox.isSlideshowRunning();
				if (running) dingNavigationBox.stopSlideshow();	
				else dingNavigationBox.startSlideshow(3000);
				slideshowDemo.text(Drupal.t(running ? "Start" : "Stop"));	
			});

			// Change position.
			$("a.move-item-button").click(function(e) {
				e.preventDefault();
				// Display info.
				var info = $("#change-position-info")
				  .removeClass("success")
				  .removeClass("error")
				  .text(Drupal.t("Changing position..."));
				// Disable move buttons while performing request.
				var moveButtons = $(".move-item-button").addClass("disabled");				  
				// Get the area to change position on.
				var area = $(".ding-navigation-box .activation-area.active-item");
				var action = ($(this).attr("id") == "move-item-down" ? "down" : "up");
				var itemID = area.data("dniid");				
				var jsonData = {"itemID": itemID, "action": action};
				// Get the other area affected by the change.
				var other = action == "down" ? area.next() : area.prev();

				// Only perform request if the position change is valid.
				if (other.length > 0) {
					$.ajax({
						type: "POST",
						url: "/" + adminPath + "/change-item-position",
						dataType: "json",
						data: jsonData,
						success: success,
					});				
				}
				else {
					info
						.addClass("error")
						.text(Drupal.t("Can't move further " + action));
					moveButtons.removeClass("disabled");					
				}

				function success(data) {
					if (data === "success") {						
						if (action  == "up") other.before(area);
						else other.after(area);
						info
							.addClass("success")
							.text(Drupal.t("Position changed succesfully"));
					}
					else if (data == "error") {
						info
							.addClass("error")
							.text(Drupal.t("There was an error changin position"));
					}
					moveButtons.removeClass("disabled");					
				}
			});
		}
	}

})(jQuery);