(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      // Use the jQuery once method to ensure the navigation box only gets
      // initialised once.
      $(".ding-navigation-box").once("ding-navigation-box-attach", function() {
        // Get the start navigation item passed from Drupal.
        var startItemPosition = settings.dingNavigationBox.startItemPosition;
        var startActivationArea = $(".ding-navigation-box .activation-areas > a:nth-of-type(" + startItemPosition + ")");
        activateNavigationItem(startActivationArea, startItemPosition);
      });

      // Iterate over each activation area and attach event-handlers.
      $(".ding-navigation-box .activation-area", context).each(function(index) {
      	var itemPosition = index + 1;  
      	$(this).bind("click touchstart", function(e) {
          e.preventDefault();
          activateNavigationItem(this, itemPosition);
      	});
      });

      // Attach an eventhandler to the acitvation area hider which is shown in
      // compact mode on small screens.
      $(".ding-navigation-box .activation-areas-pull", context).bind("click touchstart", function(e) {
        $(".ding-navigation-box .activation-areas").slideToggle();
      });

      // The jQuery slideToggle() method 
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

  function activateNavigationItem(activationArea, itemPosition) {
    // Deactivate any active items.
    $(".ding-navigation-box .content-area").hide();
    $(".ding-navigation-box .activation-area").removeClass("active-item");
    $(".ding-navigation-box .activation-area .activation-arrow").hide();
    // Activate the speified navigation item.
    $(".ding-navigation-box .content-areas > div:nth-of-type(" + itemPosition + ")").show();
    $(activationArea).addClass("active-item");
    $(activationArea).find(".activation-arrow").show();
    $(".ding-navigation-box .activation-areas-pull").html($(activationArea).find(".full").text());
  } 
  
})(jQuery);


