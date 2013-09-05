<?php

/**
 * @file 
 * 
 * Template file that defines HTML for a content area in the navigation box.
 *
 * Available variables:
 * - $content: The content to go in this area.  
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
  <?php print render($content); ?> 
</div>