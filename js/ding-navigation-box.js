(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      $(".ding-nav-box-content-area").hide();
      $(".ding-nav-box-activation-arrow").hide();
      // Activate the default navigation item.
      toggleNavigationItem(settings.dingNavigationBox.defaultItemNumber, true);
      // Iterate over each activation area and attach event-handlers.
      $(".ding-nav-box-activation-area", context).each(function(index) {
    	var itemNumber = index + 1;  
    	$(this).click(function() {
    	  // Deactivate the active navigation item.	
    	  toggleNavigationItem(activeItemNumber, false);
    	  // Activate this naviation item.
    	  toggleNavigationItem(itemNumber, true);
    	});
    	$(this).hover(function() {
    	  // Only add the hover class if the item is NOT the active item.	
    	  if (itemNumber != activeItemNumber) {
    		$(this).addClass("ding-nav-box-activation-area-hover");	    		  
    	  }
    	},function() {
    	  $(this).removeClass("ding-nav-box-activation-area-hover");	    		  
    	});
      });
    }
  };
  
  // Deactivates or activates the given navigation item.
  function toggleNavigationItem(itemNumber, activate) {
	var contentArea = $(".ding-navigation-box .content-areas > div:nth-of-type(" + itemNumber + ")");
	var activationAreaSelector = ".ding-navigation-box .activation-areas > div:nth-of-type(" + itemNumber + ")";
	if (activate) {
	  contentArea.show();
	  $(activationAreaSelector).addClass("ding-nav-box-activation-area-active");
	  $(activationAreaSelector).removeClass("ding-nav-box-activation-area-hover");
	  $(activationAreaSelector + " > .ding-nav-box-activation-arrow").show();
	  activeItemNumber = itemNumber;
	}
	else {
	  contentArea.hide();
	  $(activationAreaSelector).removeClass("ding-nav-box-activation-area-active");
	  $(activationAreaSelector + " > .ding-nav-box-activation-arrow").hide();
	  activeItemNumber = 0;
	}
  }
  
})(jQuery);


