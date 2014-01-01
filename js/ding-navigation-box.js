(function($) {

  // Helper functions

  /**
   * Basic initialization for the navigation box:
   */
  function initNavigationBox() {
    $(".ding-navigation-box .content-area").hide();
    $(".ding-navigation-box .activation-arrow").hide();
    // Activate the start item passed from Drupal
    var position = Drupal.settings.dingNavigationBox.startItemPosition;
    activateNavigationItem(getArea('activation', position), getArea('content', position));    
  }

  /**
   * Performs the necesarry operations to activate a navigation item.
   *
   * @param activationArea
   *   jQuery object containing the activation area of the item.
   * @param contentArea
   *   jQuery object containing the content area of the item.
   */
  function activateNavigationItem(activationArea, contentArea) {
    activationArea.addClass("active-item").find(".activation-arrow").show();
    contentArea.addClass("active-item").show();
    // Display title of active item on the activation areas hider.
    $(".ding-navigation-box .hider").html(activationArea.find(".full").text());    
  }

  /**
   * Retrieves the areas of the active item and performs the necesarry 
   * operations to deactive it. 
   */
  function deactivateActiveNavigationItem() {
    var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
    var activeContentArea = $(".ding-navigation-box .content-area.active-item");
    activeActivationArea.removeClass("active-item").removeClass("hover-item")
                        .find(".activation-arrow").hide();
    activeContentArea.removeClass("active-item").hide();    
  }

  /**
   * Returns the specified area.
   *
   * @param type
   *   The type of area to return ('activation' or 'content'). 
   * @param position
   *   The position of the area to return.
   */
  function getArea(type, position) {
    var areaSelector = (type === "content" ? "div" : "a");
    areaSelector += ":nth-of-type(" + position + ")";
    return $(".ding-navigation-box ." + type + "-areas > " + areaSelector);
  }  

  /**
   * Calculates and returns the current width of the browser window in em's.
   */
  function getRelativeWindowWidth() {
    var windowWidth = $(window).width();
    var fontSize = $(".ding-navigation-box").css("font-size");
    fontSize = fontSize.substring(0, fontSize.length - 2); // removes 'px'
    windowWidth /= fontSize;
    return windowWidth;    
  }    

  // Behaviors

  var slideshowTimer = false;

  Drupal.behaviors.dingNavigationBox = {     

    attach: function(context, settings) {
      $(".ding-navigation-box", context).once("ding-navigation-box-attach", function() { 
        // Initialize       
        initNavigationBox();

        // Setup event-handlers for the activation areas,
        $(".ding-navigation-box .activation-area").each(function(index) {
          var position = index + 1;
          var contentArea = getArea('content', position);
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

        var activationAreas = $(".ding-navigation-box .activation-areas");
        // Setup event-handler on item hider (displayed on small screens)        
        $(".ding-navigation-box .hider").bind("click touchstart", function() {
          activationAreas.slideToggle();
        });
        // If the window width moves from the lowest breakpoint to the next, it
        // may be needed to remove the style applied by the hider.
        $(window).resize(function() {
          var windowWidth = getRelativeWindowWidth();
          if (windowWidth > 26.25 && activationAreas.is(":hidden")) {
            activationAreas.removeAttr("style");
          }         
        });                    
      });
    },

    // Define on the behavior object to make it avialable for the admin JS.
    startSlideshow: function(interval) {
      slideshowTimer = setTimeout(function() {
        var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
        var position = $(".ding-navigation-box .activation-area").index(activeActivationArea) + 1;
        position++; // Go to next item position
        if (position > 5) {
          position = 1;
        }
        // Reuse the code on the 'click' event-handler
        getArea('activation', position).click();
        slideshowTimer = setTimeout(arguments.callee, interval);
      }, interval);       
    },

    stopSlideshow: function() {
      if (slideshowTimer) {
        clearTimeout(slideshowTimer);
      }
      slideshowTimer = false;
    }

  };
  
})(jQuery);


