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

<div class="<?php print $classes ?>" <?php print $attributes ?>>
  <?php if($navigation_items): ?> 
    <div class="ding-navigation-box-items">
      <?php print render($navigation_items); ?>
    </div>
  <?php endif; ?>
  <?php if($content_areas): ?>
    <div class="ding-navigation-box-areas">
      <?php print render($content_areas); ?>
    </div>
  <?php endif; ?>
</div>