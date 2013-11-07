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
    		$(this).addClass(settings.dingNavigationBox.hoverClass);	    		  
    	  }
    	},function() {
    	  $(this).removeClass(settings.dingNavigationBox.hoverClass);	    		  
    	});
      });
    }
  };
  
  // Deactivates or activates the given navigation item.
  function toggleNavigationItem(itemNumber, activate) {
	var contentArea = $(".ding-nav-box-content-areas > div:nth-of-type(" + itemNumber + ")");
	var activationAreaSelector = ".ding-nav-box-activation-areas-center-wrapper > div:nth-of-type(" + itemNumber + ")";
	if (activate) {
	  contentArea.show();
	  $(activationAreaSelector).addClass(Drupal.settings.dingNavigationBox.activationClass);
	  $(activationAreaSelector).removeClass(Drupal.settings.dingNavigationBox.hoverClass);
	  $(activationAreaSelector + " > .ding-nav-box-activation-arrow").show();
	  activeItemNumber = itemNumber;
	}
	else {
	  contentArea.hide();
	  $(activationAreaSelector).removeClass(Drupal.settings.dingNavigationBox.activationClass);
	  $(activationAreaSelector + " > .ding-nav-box-activation-arrow").hide();
	  activeItemNumber = 0;
	}
  }
  
})(jQuery);


