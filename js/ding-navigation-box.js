(function($) {
  
  // Declare variables
  var active;
  // Store our module-name to use as prefix in selectors.
  var prefix = ".ding-navigation-box-";
  var contentWidth;
  var contentBorderLeft;
  var borderShadow;
  
  //Declare settings variables
  var duration = 500;
  
  Drupal.behaviors.dingNavigationBox = {   
    
    attach: function(context, settings) {
      
      // First we apply settings passed from Drupal.
      applySettings(settings);
      // Store the width of the content area container.
      contentWidth = $(prefix + "content-areas").width();
      // Store the left border of the content area container.
      contentBorderLeft = $(prefix + "content-areas").css("border-left");
      // Store the border-shadow of the content area container,
      borderShadow = $(prefix + "content-areas").css("box-shadow");
      
      // The content should have a min-height equal to the height of the items
      // Since the height of the items varies with number of items and the 
      // individual height of items, we calculate the actual height of the 
      // items here and set that as the min-height for the content.
      setContentMinHeight();
      
      // Since the navigation box should start out as inactive, we run the 
      // deactivation function once when this attach function is first called.
      $(".ding-navigation-box", context).once("ding-navigation-box-attach", function() {
        deactivateNavigationBox();
        // Also run the deactivation function every the mouse leaves the 
        // navigation box.
        $(".ding-navigation-box").mouseleave(deactivateNavigationBox);  
      });
      
      // Iterate over each navigation item and attach an eventn hanlder for 
      // the mouseenter event.
      $(prefix + "item").each(function(index) {
        // Ensure each handler only gets attached once.
        $(this, context).once("ding-navigation-box-item-attach", function() {
          $(this).mouseenter(function(){
            // If the navigation box was not active we activate it before we 
            // show the associated content.
            if (!active) {activateNavigationBox(duration);}
            // Hide any active content areas.
            $(prefix + "content-area").hide();
            // Show the content area associated with this item.
            $(prefix  + "content-areas > div:nth-of-type(" + (index + 1) + ")").show();
          });
        });
      });
    }

  };
  
  // Checks if the different settings from Drupal is set, and if so applies them
  // to their associated javascript variables. If not set it applies default
  // values
  function applySettings(settings) {
    // If our module's namespace is not on the settings array we do nothing.
    if (typeof settings.dingNavigationBox === 'undefined') {
      return;
    }
    if (typeof settings.dingNavigationBox.duration !== 'undefined') {
      duration = settings.dingNavigationBox.duration;
    }
  }
  
  function activateNavigationBox(duration) {
    active = true;
    $(prefix + "content-areas")
      .css("border-left", contentBorderLeft)
      .css("box-shadow", borderShadow)
      .animate({
        width: contentWidth
      }, duration);    
  }
  
  function deactivateNavigationBox() {
    active = false;
    $(prefix + "content-area").hide();
    $(prefix + "content-areas")
      .stop()
      .width("0")
      .css("border-left", "none")
      .css("box-shadow", "none");    
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


