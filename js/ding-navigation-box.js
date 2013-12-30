(function($) {
	
  var activeItemNumber = 0;	
  
  Drupal.behaviors.dingNavigationBox = {     
    attach: function(context, settings) {
      // Use the jQuery once method to ensure the navigation box only gets
      // initialised once.
      $(".ding-navigation-box").once("ding-navigation-box-attach", function() {
        var startItemPosition = settings.dingNavigationBox.startItemPosition;
        var startActivationArea = $(".ding-navigation-box .activation-areas > a:nth-of-type(" + startItemPosition + ")");
        activateNavigationItem(startActivationArea, startItemPosition);
        // Slideshow
        startSlideshow(10000);
      });

      // Iterate over each activation area and attach event-handlers.
      $(".ding-navigation-box .activation-area", context).each(function(index) {
      	var itemPosition = index + 1;  
      	$(this).bind("click touchstart", function(e) {
          e.preventDefault();
          activateNavigationItem(this, itemPosition);
      	});
        $(this).hover(function() {
          $(this).addClass("hover-item");
        }, function() {
          $(this).removeClass("hover-item");
        });
      });

      // Attach an eventhandler to the acitvation area hider which is shown in
      // compact mode on small screens.
      $(".ding-navigation-box .activation-areas-pull", context).bind("click touchstart", function(e) {
        $(".ding-navigation-box .activation-areas").slideToggle();
      });

      // The jQuery slideToggle() method applies inline styling when hiding.
      // This style need to be removed if window size changes.
      $(window).resize(function() {
        var activationAreas = $(".ding-navigation-box .activation-areas");
        // Calculate the relative window width (rem).
        var windowWidth = $(window).width();
        var fontSize = $(".ding-navigation-box").css("font-size");
        fontSize = fontSize.substring(0, fontSize.length - 2); // removes 'px'
        windowWidth /= fontSize;
        if (windowWidth > 26.25 && activationAreas.is(":hidden")) {
          activationAreas.removeAttr("style");
        } 
      });
    }  
  };

  function activateNavigationItem(activationArea, itemPosition) {
    // Deactivate any active items.
    $(".ding-navigation-box .content-area").hide();
    $(".ding-navigation-box .activation-area").removeClass("active-item").removeClass("hover-item");
    $(".ding-navigation-box .activation-area .activation-arrow").hide();
    // Activate the speified navigation item.
    $(".ding-navigation-box .content-areas > div:nth-of-type(" + itemPosition + ")").show();
    $(activationArea).addClass("active-item");
    $(activationArea).find(".activation-arrow").show();
    $(".ding-navigation-box .activation-areas-pull").html($(activationArea).find(".full").text());
  }

  function startSlideshow(interval) {
    setTimeout(function() {
      var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
      var nextActivationArea = activeActivationArea.next();
      if (nextActivationArea.length == 0) {
        nextActivationArea = $(".ding-navigation-box .activation-areas a:first-of-type");
      }
      nextActivationArea.click();
      setTimeout(arguments.callee, interval);
    }, interval);    
  } 
  
})(jQuery);


