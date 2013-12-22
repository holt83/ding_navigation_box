(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			var adminPath = settings.dingNavigationBoxAdmin.adminPath
			// Attach event handler to each activation area, that updates the edit
			// edit link when a new naviation item is activated.
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function() {
					var dniid = $(this).data("dniid");
					var title = $(this).find(".full").text();
					$("#edit-item-link").text("Edit " + title);
					$("#edit-item-link").attr("href", "/" + adminPath + "/edit/" + dniid);
					return false;
				})
			});
			// Attach event handlers to change position of navigation items.
			$("a.move-link").click(function(e) {
				var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
				var activeItemID = activeActivationArea.data("dniid");
				var changePositionAction = "up";
				if ($(this).attr("id") === "move-down-link") {
					changePositionAction = "down";
				}
				if (changePositionAction  == "up") {
					var prevAcivationArea = activeActivationArea.prev();
					// IF the item is top position we cant move up.
					if (prevAcivationArea.length == 0) {
						return false;
					}
					prevAcivationArea.before(activeActivationArea);
				}
				else {
					var nextActivationArea = activeActivationArea.next();
					// If the item is bottom position we cant move down.
					if (nextActivationArea.length == 0) {
						return false;
					}	
					nextActivationArea.after(activeActivationArea);
				}
				// Make the ajax call to the callback function responsible for changing
				// position of navigation items.
				$.ajax({
					type: "POST",
					url: "/" + adminPath + "/change-item-position",
					dataType: "json",
					data: {"activeItemID": activeItemID, "changePositionAction": changePositionAction},
					success: changePositionSuccess,
					error: changePositionError
				});
				return false;
			});
			function changePositionSuccess(data) {
				if (data === "success") {
					alert("Position was changed successfully.");	
				}
				else {
					alert("There was a problem changing the position.");		
				}
			}
			function changePositionError(data) {
				// TODO: Notify user about error in ajax call.
			}
		}
	}
})(jQuery);