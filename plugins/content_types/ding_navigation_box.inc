<?php

/**
 * @file
 *
 * This file defines the Ding navigation ctools plugin.
 */

$plugin = array(
	'title' => t('Ding navigation box'),
	'description' => t('The Ding navigation box as a ctools plugin.'),
	'single' => TRUE,
	'content_types' => array('ding_navigation_box'),
	'render callback' => 'ding_navigation_box_render',
	'defaults' => array(), // Default empty context
	'edit form' => 'ding_navigation_box_plugin_form',
	'category' => t('Ding!'),
);

/**
 * Render callback for the navigation box plugin.
 */
function ding_navigation_box_render($subtype, $conf, $args, $context) {
	$navigation_items = ding_navigation_item_get_items();
	$start_item = ding_navigation_item_get_start_item();

	$block = new stdClass();
	$block->title = t('Ding navigation box');
	$block->content = array(
		'#theme' => 'ding_navigation_box',
		'#items' => $navigation_items,
		'#start_item_position' => $start_item->position,
	);
	
	return $block;
}

/**
 * Form builder for the ding_navigation_box_plugin_form.
 */
function ding_navigation_box_plugin_form($form, &$form_state) {
	return $form;
}

/**
 * Submit handler for the ding_navigation_box_plugin_form
 */
function ding_navigation_box_plugin_form_submit($form, &$form_state) {
	// Nothing yet.
}