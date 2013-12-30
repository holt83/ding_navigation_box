(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			// Attach event handler to each activation area, that updates the edit
			// edit link when a new naviation item is activated.
			var adminPath = settings.dingNavigationBox.adminPath
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function(e) {
					e.preventDefault;
					var dniid = $(this).data("dniid");
					var title = $(this).find(".full").text();
					$("#edit-item-link").text("Edit " + title).attr("href", "/" + adminPath + "/edit/" + dniid);
				})
			});

			// Attach event handlers to change position of navigation items.
			$("a.move-link").click(function(e) {
				e.preventDefault();

				// Display message to user telling that the ajax request is being sent.
				var message = Drupal.t("Changing position..."); 
				$("#change-position-info").removeClass("success").removeClass("error").text(message);

				var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
				changePositionAction = "up";
				otherActivationArea = activeActivationArea.prev();
				if ($(this).attr("id") === "move-down-link") {
					changePositionAction = "down";
					otherActivationArea = activeActivationArea.next();					
				}

				// Out of bounds - cancel AJAX request.
				if (otherActivationArea.length == 0) {
					message = Drupal.t("That item can't move further");
					$("#change-position-info").addClass("error").text(message);
					return false;					
				}

				// Disable move links while performing AJAX request.
				$("a.move-link").addClass("disabled");
				// Get ID of the item to change position on.
				var activeItemID = activeActivationArea.data("dniid");
				// Make the ajax call to the callback function responsible for changing
				// position of navigation items.
				$.ajax({
					type: "POST",
					url: "/" + adminPath + "/set/item-position",
					dataType: "json",
					data: {"activeItemID": activeItemID, "changePositionAction": changePositionAction},
					success: changePositionSuccess,
					timeout: 10000,
				});


				function changePositionSuccess(data) {
					// Enable move buttons again.
					$("a.move-link").removeClass("disabled");
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
					else {
						message = Drupal.t("There was a problem changing positions");
						$("#change-position-info").addClass("error");
					}

					$("#change-position-info").text(message);
				}

			});

		}
	}
})(jQuery);