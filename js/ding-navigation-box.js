(function($) {
  
  Drupal.behaviors.dingNavigationBox = {
    
    attach: function(context, settings) {
      
      // Store our module-name to use as prefix in selectors.
      var prefix = ".ding-navigation-box-";
      // Store the width of the content area container.
      var contentWidth = $(prefix + "content-areas").width();
      // Store the left border of the content area container.
      var contentBorderLeft = $(prefix + "content-areas").css("border-left");
      // Store the border-shadow of the content area container,
      var borderShadow = $(prefix + "content-areas").css("box-shadow");
      
      // We initialize the navigaion box as inactive, setting active false
      // and hiding the content area.
      var active = false;
      hideContentArea();    

      // The content should have a min-height equal to the height of the items
      // Since the height of the items varies with number of items and the 
      // individual height of items, we calculate the actual height of the 
      // items here and set that as the min-height for the content.
      setUpContentMinHeight();    
        
      // Iterate over each navigation item and attach an eventn hanlder for 
      // the mouseenter event.
      $(prefix + "item").each(function(index) {
        // Ensure each handler only gets attached once.
        $(this, context).once("ding-navigation-item-attach", function() {
          $(this).mouseenter(function(){
            // If the navigation box was not active we start the animation.
            if (!active) {
              active = true;
              $(prefix + "content-areas")
                .css("border-left", contentBorderLeft)
                .css("box-shadow", borderShadow)
                .animate({
                  width: contentWidth
                }, 500);
            }
            // Hide any active content area.
            $(prefix + "content-area").hide();
            // Show the content area associated with this item.
            $(prefix + "content-areas > div:nth-of-type(" + (index + 1) + ")").show();
          });
        });
      });
      
      // Attach an event hanlder for the mouseleave event to the navigation box.
      $(".ding-navigation-box").once("ding-navigation-box-attach", function() {
        $(".ding-navigation-box").mouseleave(function() {
          hideContentArea();
          active = false;
        });  
      });
      
      function setUpContentMinHeight() {
        var itemsHeight = $(prefix + "items").height();
        var borderHeight = $(prefix + "content-areas").css("border-bottom-width");
        var minHeight = itemsHeight - parseInt(borderHeight);
        $(prefix + "content-areas").css("min-height", minHeight);
      }
      
      function hideContentArea() {
        $(prefix + "content-area").hide();
        $(prefix + "content-areas")
          .stop()
          .width("0")
          .css("border-left", "none")
          .css("box-shadow", "none");
      }
      
    }
    
  };
  
})(jQuery)


