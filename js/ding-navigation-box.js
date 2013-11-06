(function($) {
	
  //Default settings
  var defaultItemNumber = 1;
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      // Apply settings passed from Drupal.
      applySettings(settings);
      // Activate the default navigation item.
      activateContentArea(defaultItemNumber);
      // Iterate over each activation area.
      $(".ding-nav-box-activation-area", context).each(function(index) {
    	$(this).click(function() {
          activateContentArea(index + 1);
    	});
    	$(this).hover(function() {
    	  $(this).css("background-color", "black");	
    	},function() {
    	  $(this).css("background-color", "transparent");	
    	});
      });
    }
  };
  
  function applySettings(settings) {
    // If our module's namespace is not on the settings object we do nothing.
    if (typeof settings.dingNavigationBox === 'undefined') {
      return;
    }
    if (typeof settings.dingNavigationBox.defaultItemNumber !== 'undefined') {
      defaultItemNumber = settings.dingNavigationBox.defaultItemNumber;
    }
  }
  
  // Activates the content area with the specified index.
  function activateContentArea(itemNumber) {
    // Deactivate active navigation item.
    $(".ding-nav-box-content-area").hide();
    $(".ding-nav-box-activation-arrow").hide();
    $(".ding-nav-box-activation-area").css("background-color", "transparent");
    
    var contentArea = $(".ding-nav-box-content-areas > div:nth-of-type(" + itemNumber + ")");
    if (contentArea.length > 0) {
      // Show the content area.	
      $(contentArea).show();
      var activationArea = ".ding-nav-box-activation-areas-center-wrapper > div:nth-of-type(" + itemNumber + ")";
      $(activationArea).css("background-color", "black");
      // Show the activation arrow.
      $(activationArea + " > .ding-nav-box-activation-arrow").show();
    }
    // If the specified itemNumber is out of bounds show first item.
    else {
      $(".ding-nav-box-content-areas > div:nth-of-type(1)").show(); 	
    }
  }

  
})(jQuery);


