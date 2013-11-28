(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      $(".ding-navigation-box .content-areas .content-area", context).hide();
      $(".ding-navigation-box .activation-areas .activation-area .activation-arrow", context).hide();
      // Activate the default navigation item.
      toggleNavigationItem(settings.dingNavigationBox.activeItemNumber, true);
      // Iterate over each activation area and attach event-handlers.
      $(".ding-navigation-box .activation-area", context).each(function(index) {
      	var itemNumber = index + 1;  
      	$(this).bind("click touchstart", function(e) {
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
      $(".ding-navigation-box .activation-areas-pull").bind("click touchstart", function(e) {
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
  
  // Deactivates or activates the given navigation item.
  function toggleNavigationItem(itemNumber, activate) {
  	var contentArea = $(".ding-navigation-box .content-areas > div:nth-of-type(" + itemNumber + ")");
  	var activationAreaSelector = ".ding-navigation-box .activation-areas > div:nth-of-type(" + itemNumber + ")";
  	if (activate) {
  	  contentArea.show();
  	  $(activationAreaSelector).addClass("active");
  	  $(activationAreaSelector).removeClass("hover");
  	  $(activationAreaSelector + " .activation-arrow").show();
      $(".ding-navigation-box .activation-areas-pull").html($(activationAreaSelector + " p.full").text());
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


