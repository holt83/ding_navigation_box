<?php

/**
 * @file
 * 
 * Template file that defines HTML for the Ding navigation box.
 * 
 * Available variables:
 * - $items:
 * - $areas: 
 */

?>

<div id="ding-navigation-box" class="<?php print $classes ?>" >
  <div id="ding-navigation-box-items">
    <?php print render($items); ?>
  </div>
  <div id="ding-navigation-box-areas">
    <?php print render($areas); ?>
  </div>
</div>