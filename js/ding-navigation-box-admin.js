(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			var adminPath = settings.dingNavigationBoxAdmin.adminPath

			// Attach event handler to each activation area, that updates the edit
			// edit link when a new naviation item is activated.
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function(e) {
					e.preventDefault;
					var dniid = $(this).data("dniid");
					var title = $(this).find(".full").text();
					$("#edit-item-link").text("Edit " + title);
					$("#edit-item-link").attr("href", "/" + adminPath + "/edit/" + dniid);
				})
			});

			// Attach event handlers to change position of navigation items.
			$("a.move-link").click(function(e) {
				// Disable move links while performing ajax request.
				$(this).addClass("disabled");

				e.preventDefault();

				// Display message to user telling that the ajax request is being sent.
				var message = Drupal.t("Changing position") + "..."; 
				$("#change-position-info").text(message);
				$("#change-position-info").removeClass("success").removeClass("error");

				var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
				var activeItemID = activeActivationArea.data("dniid");
				var changePositionAction = "up";
				if ($(this).attr("id") === "move-down-link") {
					changePositionAction = "down";
				}
				
				// Validate the position change (check if out of bounds).
				if (changePositionAction  == "up") {
					var prevAcivationArea = activeActivationArea.prev();
					if (prevAcivationArea.length == 0) {
						$(this).removeClass("disabled");
						message = Drupal.t("That item can't be moved further up");
						$("#change-position-info").text(message);
						$("#change-position-info").addClass("error");
						return false;
					}					
				}
				else if (changePositionAction == "down") {
					var nextActivationArea = activeActivationArea.next();
					if (nextActivationArea.length == 0) {
						$(this).removeClass("disabled");
						message = Drupal.t("That item can't be moved further down");
						$("#change-position-info").text(message);
						$("#change-position-info").addClass("error");
						return false;
					}					
				}

				// Make the ajax call to the callback function responsible for changing
				// position of navigation items.
				$.ajax({
					type: "POST",
					url: "/" + adminPath + "/set/item-position",
					dataType: "json",
					data: {"activeItemID": activeItemID, "changePositionAction": changePositionAction},
					success: changePositionSuccess,
					error: changePositionError,
					timeout: 10000,
				});


				function changePositionSuccess(data) {
					if (data === "success") {
						// If Drupal returned "success" the item positions was succesfully
						// changed, and below we reflect that change in the admin ui.
						if (changePositionAction  == "up") {
							prevAcivationArea.before(activeActivationArea);
							$("#move-up-link").removeClass("disabled");
						}
						else if (changePositionAction == "down") { //added for clarity.
							nextActivationArea.after(activeActivationArea);
							$("#move-down-link").removeClass("disabled");
						}
						message = Drupal.t("Position changed succesfully");
						$("#change-position-info").text(message);	
						$("#change-position-info").addClass("success");
					}
					else {
						message = Drupal.t("There was a problem changing positions.");
						$("#change-position-info").text(message);
						$("#change-position-info").addClass("error");		
					}
				}

				function changePositionError(data) {
					message = Drupal.t("There was a problem changing positions. Error message: @data", {'@data': data});
					$("#change-position-info").text(message);
					$("#change-position-info").addClass("error");
				}

			});

		}
	}
})(jQuery);