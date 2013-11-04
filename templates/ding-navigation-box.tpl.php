<?php

/**
 * @file
 * 
 * Template file that defines HTML for the Ding navigation box.
 * 
 * The navigation box consist of entries. Each entry consist of a navigation
 * item (the button/link) and a content area (the area that shows up when the
 * corresponding navigation item is activated). 
 * 
 * Available variables:
 * - $navigation_items: The navigation items.
 * - $content_areas: The content areas.
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this navigation box. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.
 */

?>

<?php if($navigation_items && $content_areas): ?> 
  <div class="<?php print $classes ?>" <?php print $attributes ?>>
      <div class="ding-navigation-box-items">
        <div class="ding-navigation-box-items-center-wrapper">
          <?php print render($navigation_items); ?>
        </div>
      </div>
      <div class="ding-navigation-box-content-areas">
        <?php print render($content_areas); ?>
      </div>
  </div>
<?php endif; ?>