(function($) {
  
  // Store prefix to use in selectors.
  var prefix = ".ding-nav-box-";
  
  //Declare settings variables with defaults.
  var defaultEntryIndex = 1;
  var activationEvent = "mouseenter";
  
  Drupal.behaviors.dingNavigationBox = {   
    
    attach: function(context, settings) {
      
      // Apply settings passed from Drupal.
      applySettings(settings);
      
      // Activate the default content area.
      activateContentArea(defaultEntryIndex);
      
      // Iterate over each navigation item and attach an event hanlder for 
      // the activation event.
      $(prefix + "activation-area").each(function(index) {
        // Ensure each handler only gets attached once.
        $(this, context).once("ding-nav-box-activation-area-attach", function() {
          $(prefix + "activation-areas-center-wrapper > div:nth-of-type(" + (index + 1) + ")").live(activationEvent, function() {
        	activateContentArea(index + 1);
          });
        });
      });
    }

  };
  
  // Checks if the different settings from Drupal is set, and if so applies them
  // to their associated javascript variables. If not set it applies default
  // values
  function applySettings(settings) {
    // If our module's namespace is not on the settings object we do nothing.
    if (typeof settings.dingNavigationBox === 'undefined') {
      return;
    }
    if (typeof settings.dingNavigationBox.defaultEntryIndex !== 'undefined') {
      defaultEntryIndex = settings.dingNavigationBox.defaultEntryIndex;
    }
    if (typeof settings.dingNavigationBox.activationEvent !== 'undefined') {
      activationEvent = settings.dingNavigationBox.activationEvent;
    }    
  }
  
  // Activates the content area with the specified index.
  function activateContentArea(entryIndex) {
    // Hide any active content areas.
    $(prefix + "content-area").hide();
    // Show the content area associated with this item.
    if ($(prefix  + "content-areas > div:nth-of-type(" + entryIndex + ")").length > 0) {
      $(prefix  + "content-areas > div:nth-of-type(" + entryIndex + ")").show();	  
    }
    // If the specified index is out of bounds just show the first entry.
    else {
      $(prefix  + "content-areas > div:nth-of-type(1)").show(); 	
    }
  }

  
})(jQuery);


