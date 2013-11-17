<?php

/**
 * @file
 * 
 * Template file that defines HTML for the Ding navigation box.
 * 
 * The navigation box consist of navigation items. Each item consist of an 
 * activation area and a content area.
 * The activation area of a navigation item activate its corresponding content
 * area. The content area of a navigation item is, by default, setup to show the 
 * content of the item, but the activation area can also be used to show content 
 * if the template file is overriden in a theme.
 * 
 * Available variables:
 * - $activation_areas: The navigation areas of the navigation items.
 * - $content_areas: The content areas of the navigation items.
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this navigation box. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.               
 */

?>

<?php if($activation_areas && $content_areas): ?> 
  <div class="<?php print $classes ?> clearfix" <?php print $attributes ?>>
    <div class="activation-areas clearfix">
      <?php print render($activation_areas); ?>
    </div>
    <div class="content-areas">
     <?php print render($content_areas); ?>
    </div>
  </div>
<?php endif; ?>