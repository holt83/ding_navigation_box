(function($) {
	Drupal.behaviors.dingNavigationBoxAdmin = {
		attach: function(context, settings) {
			var adminURI = settings.dingNavigationBoxAdmin.adminURI;
			// Attach event handler to each activation area, that updates the edit
			// edit link when a new naviation item is activated.
			$(".ding-navigation-box .activation-area", context).each(function(index) {
				$(this).click(function() {
					var dniid = $(this).data("dniid");
					var title = $(".ding-navigation-box a:nth-of-type(" + (index + 1) + ") .full").text();
					$("#edit-item-link").text("Edit " + title);
					$("#edit-item-link").attr("href", "/" + adminURI + "/edit/" + dniid);
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
					if (prevAcivationArea === "undefined") {
						return false;
					}
					prevAcivationArea.before(activeActivationArea);
				}
				else {
					var nextActivationArea = activeActivationArea.next();
					if (nextActivationArea === "undefined") {
						return false;
					}	
					nextActivationArea.after(activeActivationArea);
				}
				$.ajax({
					type: "POST",
					url: "/" + adminURI + "/change-item-position",
					dataType: "json",
					data: {"activeItemID": activeItemID, "changePositionAction": changePositionAction},
					success: changePositionSuccess,
					error: changePositionError
				});
				return false;
			});
			function changePositionSuccess(data) {
				// TODO: Notify user that position was changed.
			}
			function changePositionError(data) {
				// TODO: Notify user about error in ajax call.
			}
		}
	}
})(jQuery);