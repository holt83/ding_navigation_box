<?php

/**
 * Template file that defines HTML for an item in the Ding navigation box.
 * 
 * Available variables:
 * - $text: The text for the navigation item.  
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this navigation box. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.
 */
?>

<div class="<?php print $classes;?>" <?php print $attributes ?>>
  <h4><?php print $text; ?></h4>
</div>