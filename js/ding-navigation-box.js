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
    var startItemPosition = Drupal.settings.dingNavigationBox.startItemPosition;
    var startActivationArea = getActivationArea(startItemPosition);
    var startContentArea = getContentArea(startItemPosition);
    activateNavigationItem(startActivationArea, startContentArea);    
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
    activationArea.addClass("active-item");
    contentArea.addClass("active-item");
    activationArea.find(".activation-arrow").show();
    contentArea.show();
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
    activeActivationArea.removeClass("active-item").removeClass("hover-item");
    activeContentArea.removeClass("active-item");
    activeActivationArea.find(".activation-arrow").hide();
    activeContentArea.hide();    
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

  Drupal.behaviors.dingNavigationBox = {     

    attach: function(context, settings) {
      $(".ding-navigation-box", context).once("ding-navigation-box-attach", function() { 
        // Initialize       
        initNavigationBox();
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
        // Setup event-handler on item hider (displayed on small screens)
        var activationAreas = $(".ding-navigation-box .activation-areas");
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

    // Define on the behavior object, to make it avialable for the admin JS.
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


