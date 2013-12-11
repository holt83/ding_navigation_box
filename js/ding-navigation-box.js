(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      // Use the jQuery once method to ensure the navigation box only gets
      // initialised once.
      $(".ding-navigation-box").once("ding-navigation-box-attach", function() {
        $(".ding-navigation-box .content-areas .content-area", context).hide();
        $(".ding-navigation-box .activation-areas .activation-area .activation-arrow", context).hide();
        // Activate the default navigation item.
        toggleNavigationItem(settings.dingNavigationBox.activeItemPosition, true);
      });
      // Iterate over each activation area and attach event-handlers.
      $(".ding-navigation-box .activation-area", context).each(function(index) {
      	var itemNumber = index + 1;  
      	$(this).bind("click touchstart", function(e) {
      	  // Deactivate the active navigation item.	
      	  toggleNavigationItem(activeItemNumber, false);
      	  // Activate this naviation item.
      	  toggleNavigationItem(itemNumber, true);
          return false;
      	});
      });
      $(".ding-navigation-box .activation-areas-pull", context).bind("click touchstart", function(e) {
        $(".ding-navigation-box .activation-areas").slideToggle();
      });
      $(window).resize(function() {
        var activationAreas = $(".ding-navigation-box .activation-areas");
        // Calculate the relative window width (rem).
        var windowWidth = $(window).width();
        var fontSize = $(".ding-navigation-box").css("font-size");
        fontSize = fontSize.substring(0, fontSize.length - 2); // removes 'px'
        windowWidth /= fontSize;
        if (windowWidth > 26.25 && activationAreas.is(":hidden")) {
          // Remove the inline styling applied by the slideToggle method.
          activationAreas.removeAttr("style");
        } 
      });
    }  
  };
  
  // Deactivates or activates a navigation item.
  function toggleNavigationItem(itemNumber, activate) {
  	var contentAreaSelector = ".ding-navigation-box .content-areas > div:nth-of-type(" + itemNumber + ")";
  	var activationAreaSelector = ".ding-navigation-box .activation-areas > a:nth-of-type(" + itemNumber + ")";
  	if (activate) {
  	  $(contentAreaSelector).show();
  	  $(activationAreaSelector).addClass("active-item");
  	  $(activationAreaSelector + " .activation-arrow").show();
      $(".ding-navigation-box .activation-areas-pull").html($(activationAreaSelector + " .full").text());
  	  activeItemNumber = itemNumber;
  	}
  	else {
  	  $(contentAreaSelector).hide();
  	  $(activationAreaSelector).removeClass("active-item");
  	  $(activationAreaSelector + " .activation-arrow").hide();
  	  activeItemNumber = 0;
  	}
  }
  
})(jQuery);


