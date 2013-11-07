(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      $(".ding-nav-box-content-area").hide();
      $(".ding-nav-box-activation-arrow").hide();
      // Activate the default navigation item.
      activateNavigationItem(settings.dingNavigationBox.defaultItemNumber);
      // Iterate over each activation area.
      $(".ding-nav-box-activation-area", context).each(function(index) {
    	var itemNumber = index + 1;  
    	$(this).click(function() {
    	  toggleNavigationItem(activeItemNumber, false);	
    	  toggleNavigationItem(itemNumber, true);
    	});
    	$(this).hover(function() {
    	  $(this).css("background-color", "black");	    		  
    	},function() {
    	  if (itemNumber != activeItemNumber) {
    		$(this).css("background-color", "transparent");	    		  
    	  }	
    	});
      });
    }
  };
  
  function toggleNavigationItem(itemNumber, activate) {
	var contentArea = $(".ding-nav-box-content-areas > div:nth-of-type(" + itemNumber + ")");
	var activationAreaSelector = ".ding-nav-box-activation-areas-center-wrapper > div:nth-of-type(" + itemNumber + ")";
	if (activate) {
	  contentArea.show();
	  $(activationAreaSelector).css("background-color", "black");
	  $(activationAreaSelector + " > .ding-nav-box-activation-arrow").show();
	  activeItemNumber = itemNumber;
	}
	else {
	  contentArea.hide();
	  $(activationAreaSelector).css("background-color", "transparent");
	  $(activationAreaSelector + " > .ding-nav-box-activation-arrow").hide();
	  activeItemNumber = 0;
	}
  }
  
})(jQuery);


