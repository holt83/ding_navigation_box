(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			// Updates the edit link when a new navigation item is activated.
			var adminPath = settings.dingNavigationBox.adminPath
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function(e) {
					e.preventDefault;
					var dniid = $(this).data("dniid");
					var title = $(this).find(".full").text();
					$("#edit-item-link").text("Edit " + title).attr("href", "/" + adminPath + "/edit/" + dniid);
				})
			});

			// Slideshow demo
			var slideshowDemo = $("#slideshow-demo");
			var slideshowDemoRunning = false;
			slideshowDemo.click(function(e) {
				e.preventDefault();
				var dingNavigationBox = Drupal.behaviors.dingNavigationBox;
				if (slideshowDemoRunning) {
					dingNavigationBox.stopSlideshow();
					slideshowDemo.text(Drupal.t("Start"));
				}
				else {
					dingNavigationBox.startSlideshow(3000);
					slideshowDemo.text(Drupal.t("Stop"));
				}	
				slideshowDemoRunning = !slideshowDemoRunning;			
			});

			// Attach event handlers to button that change position of navigation items.
			$("a.move-item-button").click(function(e) {
				e.preventDefault();

				// Display message to user telling that the ajax request is being sent.
				var message = Drupal.t("Changing position..."); 
				$("#change-position-info").removeClass("success").removeClass("error").text(message);

				var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
				changePositionAction = "up";
				otherActivationArea = activeActivationArea.prev();
				if ($(this).attr("id") == "move-item-down") {
					changePositionAction = "down";
					otherActivationArea = activeActivationArea.next();					
				}

				// Out of bounds - cancel AJAX request.
				if (otherActivationArea.length == 0) {
					message = Drupal.t("That item can't move further " + changePositionAction);
					$("#change-position-info").addClass("error").text(message);
					return false;					
				}

				// Disable move links while performing AJAX request.
				$("a.move-item-button").addClass("disabled");
				// Get ID of the item to change position on.
				var activeItemID = activeActivationArea.data("dniid");
				// Make the ajax call to the callback function responsible for changing
				// position of navigation items.
				$.ajax({
					type: "POST",
					url: "/" + adminPath + "/change-item-position",
					dataType: "json",
					data: {"activeItemID": activeItemID, "changePositionAction": changePositionAction},
					success: function(data) {
						// Enable move buttons again.
						$("a.move-item-button").removeClass("disabled");
						// If success, update the position on the client.
						if (data === "success") {						
							if (changePositionAction  == "up") {
								otherActivationArea.before(activeActivationArea);
							}
							else { 
								otherActivationArea.after(activeActivationArea);
							}
							message = Drupal.t("Position changed succesfully");
							$("#change-position-info").addClass("success");
						}
						// If error, notify the user.
						else if (data === "error") {
							message = Drupal.t("There was a problem changing positions");
							$("#change-position-info").addClass("error");
						}

						$("#change-position-info").text(message);
					}
				});
			});
		}
	}

})(jQuery);