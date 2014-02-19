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
			var dingNavigationBox = Drupal.behaviors.dingNavigationBox;
			slideshowDemo.click(function(e) {
				e.preventDefault();
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
				dingNavigationBox.stopSlideshow();
				// Get the areas of the item to change position on.
				
				var activationArea = $(".ding-navigation-box .activation-area.active-item");
				var contentArea = $(".ding-navigation-box content-area.active-item");
				var action = ($(this).attr("id") == "move-item-down" ? "down" : "up");
				var itemID = activationArea.data("dniid");				
				var jsonData = {"itemID": itemID, "action": action};
				// Get the other ativation area affected by the change.
				var otherActivationArea = (action == "down" ? 
					activationArea.next() : activationArea.prev());
				var otherContentArea = (action == "down" ?
					contentArea.next() : contentArea.prev());


				// Only perform request if the position change is valid.
				if (otherActivationArea.length > 0) {
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
					//dingNavigationBox.startSlideshow(3000);					
				}

				function success(data) {
					if (data === "success") {						
						if (action  == "up") { 
							otherActivationArea.before(activationArea); 
						}
						else if (action == "down") { 
							otherActivationArea.after(activationArea); 
						}
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
					dingNavigationBox.startSlideshow(3000);					
				}
			});
		}
	}

})(jQuery);