<?php

/**
 * @file 
 * 
 * Template file that defines HTML for a content area of a ding navigation item.
 *
 * Available variables:
 * - $item: The navigation item this content area belongs to.
 * - $classes: String of classes that can be used to style contextually with 
 *             CSS. It can be manipulated throught $classes_array variable in
 *             preprocess functions.
 * - $attributes: String of attributes for this content area. The string can 
 *                be manipulated through the variable $attributes_array in 
 *                preprocess funtions.
 * 
 */

?>

<div class="<?php print $classes; ?>" <?php print $attributes; ?>>
  <div class="header">
    <!-- Title -->
	  <?php print render($title_prefix); ?>
	  <h2 <?php print $title_attributes ?>><?php print $title; ?></h2>
	  <?php print render($title_suffix); ?>
	  <!-- Header text -->
	  <?php if (isset($header_text)): ?>
	  	<div class="header-text">	
			  <?php foreach($header_text as $paragraph): ?>
			  	<div class="header-text-paragraph">
			  		<?php print render($paragraph); ?>
			  	</div>
			  <?php endforeach; ?>
		  </div>
	  <?php endif; ?>	
  </div>
  <div class="main-content">
  	
  </div>
  <div class="footer">
  	<!-- Links -->
  	<?php if (isset($links)): ?>
  		<ul class="links clearfix">
  			<?php foreach($links as $link): ?>
  				<li><?php print render($link); ?></li>
  			<?php endforeach; ?>	
  		</ul>
  	<?php endif; ?>
  </div>
</div>