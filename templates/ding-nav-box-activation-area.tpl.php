<?php

/**
 * Template file that defines HTML for an activation area of a ding navigation 
 * item.
 * 
 * Available variables:
 * - $item: The navigation item this activation area belongs to.
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this navigation item. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.
 */

?>

<a href="#" class="<?php print $classes;?>" <?php print $attributes ?>>
  <span class="full"><?php print $title; ?></span>
  <span class="abbreviation"><?php print $abbreviation; ?></span>
  <div class="activation-arrow"></div>
</a>