(function($) {

  var dingNavigationBox;

  Drupal.behaviors.dingNavigationBox = {     
    // Main attach function for the ding navigation box module.
    attach: function(context, settings) {
      // Only process the navigation box once.
      $(".ding-navigation-box", context).once("ding-navigation-box-attach", function() {        
        Drupal.behaviors.dingNavigationBox.init();
        // Iterate over each activation area and attach event-handlers.
        $(".ding-navigation-box .activation-area").each(function(index) {
          var position = index + 1;  
          $(this).bind("click touchstart", function(e) {
            e.preventDefault();
            dingNavigationBox.deactivateActiveNavigationItem();
            dingNavigationBox.activateNavigationItem($(this), position);
          });
          $(this).hover(
            function() { $(this).addClass("hover-item"); }, 
            function() { $(this).removeClass("hover-item"); } 
          );
        });      
      });
    },

    init: function() {
      $(".ding-navigation-box .content-area").hide();
      $(".ding-navigation-box .activation-arrow").hide();
      dingNavigationBox = Drupal.behaviors.dingNavigationBox;
      var startItemPosition = Drupal.settings.dingNavigationBox.startItemPosition;
      var startActivationArea = $(".ding-navigation-box .activation-areas a:nth-of-type(" + startItemPosition + ")");
      dingNavigationBox.activateNavigationItem(startActivationArea, startItemPosition);
      dingNavigationBox.setupActivationAreasHider();
      //dingNavigationBox.startSlideshow(5000);
    },

    activateNavigationItem: function(activationArea, position) {
      var contentArea = dingNavigationBox.getContentArea(position);
      activationArea.addClass("active-item");
      contentArea.addClass("active-item");
      activationArea.find(".activation-arrow").show();
      contentArea.show();
      $(".ding-navigation-box .activation-areas-pull").html(activationArea.find(".full").text());      
    },

    deactivateActiveNavigationItem: function() {
      var contentAreaPosition = dingNavigationBox.getActiveContentAreaPosition();
      var activationAreaPosition = dingNavigationBox.getActiveActivationAreaPosition();
      if (contentAreaPosition && activationAreaPosition) {
        var activationArea = dingNavigationBox.getActivationArea(activationAreaPosition);
        var contentArea = dingNavigationBox.getContentArea(contentAreaPosition);
        activationArea.removeClass("active-item").removeClass("hover-item");
        contentArea.removeClass("active-item");
        activationArea.find(".activation-arrow").hide();
        contentArea.hide();
      }
    },

    startSlideshow: function(interval) {
      setTimeout(function() {
        var nextItemPosition = dingNavigationBox.getActiveActivationAreaPosition();
        nextItemPosition++;
        if (nextItemPosition > 5) {
          nextItemPosition = 1;
        }
        var nextActivationArea
        dingNavigationBox.deactivateActiveNavigationItem();
        dingNavigationBox.activateNavigationItem()
        setTimeout(arguments.callee, interval);
      }, interval);       
    },

    // Helper functions
    getActivationArea: function(position) {
      return $(".ding-navigation-box .activation-areas a:nth-of-type(" + position + ")");
    },
    getContentArea: function(position) {
      return $(".ding-navigation-box .content-areas > div:nth-of-type(" + position + ")");
    },
    getActiveContentAreaPosition: function() {
      var activeContentArea = $(".ding-navigation-box .content-area.active-item");
      if (activeContentArea.length == 1) {
        return $(".ding-navigation-box .content-area").index(activeContentArea) + 1;
      }
      return false;
    },
    getActiveActivationAreaPosition: function() {
      var activeActivationArea = $(".ding-navigation-box .activation-area.active-item");
      if (activeActivationArea.length == 1) {
        return $(".ding-navigation-box .activation-area").index(activeActivationArea) + 1;
      }
      return false;
    },    
    setupActivationAreasHider: function() {
      var activationAreas = $(".ding-navigation-box .activation-areas");
      $(".ding-navigation-box .activation-areas-pull").bind("click touchstart", function(e) {
        e.preventDefault();
        activationAreas.slideToggle();
      });
      $(window).resize(function() {
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
  
})(jQuery);


