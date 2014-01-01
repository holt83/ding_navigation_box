(function($) {

  // Helper functions

  /**
   * Basic initialization for the navigation box:
   * 
   * - Hide the content areas and activation arrows.
   * - Get the start item position passed from Drupal, and activate the item on
   *   that posiition. 
   */
  function initNavigationBox() {
    $(".ding-navigation-box .content-area").hide();
    $(".ding-navigation-box .activation-arrow").hide();
    var startPosition = Drupal.settings.dingNavigationBox.startItemPosition;
    activateNavigationItem(getActivationArea(startPosition), getContentArea(startPosition));    
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
   * Returns the activation area with the specified position.
   */
  function getActivationArea(position) {
    return $(".ding-navigation-box .activation-areas > a:nth-of-type(" + position + ")");
  }

  /**
   * Returns the content area with the specified position.
   */
  function getContentArea(position) {
    return $(".ding-navigation-box .content-areas > div:nth-of-type(" + position + ")");
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

  var slideshowTimer = null;

  Drupal.behaviors.dingNavigationBox = {     

    attach: function(context, settings) {
      $(".ding-navigation-box", context).once("ding-navigation-box-attach", function() { 
        // Initialize       
        initNavigationBox();

        // Navigation item slideshow
        Drupal.behaviors.dingNavigationBox.startSlideshow(3000);

        // Setup event-handlers for the activation areas,
        $(".ding-navigation-box .activation-area").each(function(index) {
          var position = index + 1;
          var contentArea = getContentArea(position);
          $(this).bind("click touchstart", function() {
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
        getActivationArea(position).click();
        slideshowTimer = setTimeout(arguments.callee, interval);
      }, interval);       
    }

  };
  
})(jQuery);


