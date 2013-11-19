(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      $(".ding-navigation-box .content-areas .content-area").hide();
      $(".ding-navigation-box .activation-areas .activation-area .activation-arrow").hide();
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
      	  if (itemNumber != activeItemNumber) {
      		$(this).addClass("hover");	    		  
      	  }
      	},function() {
      	  $(this).removeClass("hover");	    		  
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
	  $(activationAreaSelector).addClass("active");
	  $(activationAreaSelector).removeClass("hover");
	  $(activationAreaSelector + " .activation-arrow").show();
	  activeItemNumber = itemNumber;
	}
	else {
	  contentArea.hide();
	  $(activationAreaSelector).removeClass("active");
	  $(activationAreaSelector + " .activation-arrow").hide();
	  activeItemNumber = 0;
	}
  }
  
})(jQuery);


