(function($) {

  // Helper functions

  function initNavigationBox() {
    $(".ding-navigation-box .content-area").hide();
    $(".ding-navigation-box .activation-arrow").hide();
    dingNavigationBox = Drupal.behaviors.dingNavigationBox;
    var startItemPosition = Drupal.settings.dingNavigationBox.startItemPosition;
    var startActivationArea = getActivationArea(startItemPosition);
    var startContentArea = getContentArea(startItemPosition);
    activateNavigationItem(startActivationArea, startContentArea);    
  }

  function activateNavigationItem(activationArea, contentArea) {
    activationArea.addClass("active-item");
    contentArea.addClass("active-item");
    activationArea.find(".activation-arrow").show();
    contentArea.show();
    $(".ding-navigation-box .hider").html(activationArea.find(".full").text());    
  }

  function deactivateActiveNavigationItem() {
    var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
    var activeContentArea = $(".ding-navigation-box .content-area.active-item");
    activeActivationArea.removeClass("active-item").removeClass("hover-item");
    activeContentArea.removeClass("active-item");
    activeActivationArea.find(".activation-arrow").hide();
    activeContentArea.hide();    
  }

  function getActivationArea(position) {
    return $(".ding-navigation-box .activation-areas > a:nth-of-type(" + position + ")");
  }

  function getContentArea(position) {
    return $(".ding-navigation-box .content-areas > div:nth-of-type(" + position + ")");
  }

  function getRelativeWindowWidth() {
    var windowWidth = $(window).width();
    var fontSize = $(".ding-navigation-box").css("font-size");
    fontSize = fontSize.substring(0, fontSize.length - 2); // removes 'px'
    windowWidth /= fontSize;
    return windowWidth;    
  }    

  // Behaviors

  Drupal.behaviors.dingNavigationBox = {     

    attach: function(context, settings) {
      $(".ding-navigation-box", context).once("ding-navigation-box-attach", function() { 
        // Initialize       
        initNavigationBox();
        // Setup event-handlers for the activation areas,
        $(".ding-navigation-box .activation-area").each(function(index) {
          var position = index + 1;
          var contentArea = getContentArea(position);
          $(this).bind("click touchstart", function(e) {
            e.preventDefault();
            deactivateActiveNavigationItem();
            activateNavigationItem($(this), contentArea);
          });
          $(this).hover(
            function() { $(this).addClass("hover-item"); }, 
            function() { $(this).removeClass("hover-item"); } 
          );                   
        });
        // Setup event-handler on item hider (displayed on small screens)
        var activationAreas = $(".ding-navigation-box .activation-areas");
        $(".ding-navigation-box .hider").bind("click touchstart", function(e) {
          e.preventDefault();
          activationAreas.slideToggle();
        });
        // Remove attr applied by jQuery slideToggle()
        $(window).resize(function() {
          var windowWidth = getRelativeWindowWidth();
          if (windowWidth > 26.25 && activationAreas.is(":hidden")) {
            activationAreas.removeAttr("style");
          }         
        });                    
      });
    },

    // Define on the Ding navigation box behavior object, to make it avialable 
    // for the admin javascript.
    startSlideshow: function(interval) {
      setTimeout(function() {
        var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
        var itemPosition = $(".ding-navigation-box .activation-areas").index(activeActivationArea);
        itemPosition++;
        if (temPosition > 5) {
          itemPosition = 1;
        }
        setTimeout(arguments.callee, interval);
      }, interval);       
    }

  };
  
})(jQuery);


