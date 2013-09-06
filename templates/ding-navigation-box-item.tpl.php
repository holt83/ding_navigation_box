<?php

/**
 * Template file that defines HTML for an item in the Ding navigation box.
 * 
 * Available variables:
 * - $entry_title: The title for the entry this navigation item is part of.
 * - $entry_position: A number specifying the position of the entry in the
 *                    navigation box.
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this navigation item. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.
 */

?>

<div class="<?php print $classes;?>" <?php print $attributes ?>>
  <h4><?php print render($entry_title); ?></h4>
</div>