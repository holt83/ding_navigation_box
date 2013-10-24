(function($) {
  
  // Store our module-name to use as prefix in selectors.
  var prefix = ".ding-navigation-box-";
  
  //Declare settings variables with defaults.
  var defaultEntryIndex = 1;
  
  Drupal.behaviors.dingNavigationBox = {   
    
    attach: function(context, settings) {
      
      // Apply settings passed from Drupal.
      applySettings(settings);
      
      // Activate the default content area.
      activateContentArea(defaultEntryIndex);
      
      // The content should have a min-height equal to the height of the items
      // Since the height of the items varies with number of items and the 
      // individual height of items, we calculate the actual height of the 
      // items here and set that as the min-height for the content.
      setContentMinHeight();
      
      // Iterate over each navigation item and attach an eventn hanlder for 
      // the mouseenter event.
      $(prefix + "item").each(function(index) {
        // Ensure each handler only gets attached once.
        $(this, context).once("ding-navigation-box-item-attach", function() {
          $(this).on('click', function() {
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
  }
  
  // Activates the content area with the specified index.
  function activateContentArea(entryIndex) {
    // Hide any active content areas.
    $(prefix + "content-area").hide();
    // Show the content area associated with this item.
    if ($(prefix  + "content-areas > div:nth-of-type(" + entryIndex + ")").length > 0) {
      $(prefix  + "content-areas > div:nth-of-type(" + entryIndex + ")").show();	  
    }
    else {
      $(prefix  + "content-areas > div:nth-of-type(1)").show(); 	
    }
  }

  function setContentMinHeight() {
    var itemsHeight = $(prefix + "items").height();
    // Since the height() method return content-height, we need to add the
    // height of the top and bottom border to get the right height of the
    // content areas because of the border-box box-sizing css property.
    var borderHeight = $(prefix + "content-areas").css("border-bottom-width");
    var minHeight = itemsHeight + 2 * parseInt(borderHeight);
    $(prefix + "content-areas").css("min-height", minHeight);
  }
  
})(jQuery)


