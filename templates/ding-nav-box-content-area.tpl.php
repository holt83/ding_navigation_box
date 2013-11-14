<?php

/**
 * @file 
 * 
 * Template file that defines HTML for a content area of a ding navigation item.
 *
 * Available variables:
 * - $item: The navigation item this content area belongs to.
 * - $item_position: A number specifying the position of the item in the
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
  <h3><?php print $item_position; ?></h3>
  <h3>This is a test line inserted to test max-width property on the ding navigation box</h3>
  <br>
  <hr>
  <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <?php// print render($entry_content); ?> 
</div>