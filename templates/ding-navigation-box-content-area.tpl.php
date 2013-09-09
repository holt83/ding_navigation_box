<?php

/**
 * @file 
 * 
 * Template file that defines HTML for a content area in the navigation box.
 *
 * Available variables:
 * - $entry_title: The title of the entry this content area belongs to.
 * - $entry_content: The content of the entry to go in this area.
 * - $entry_position: A number specifying the position of the entry in the
 *                    navigation box.  
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this content area. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.
 * 
 */

?>

<div class="<?php print $classes; ?>" <?php print $attributes ?>>
  <h3><?php print $entry_title; ?></h3>
  <?php print render($entry_content); ?> 
</div>