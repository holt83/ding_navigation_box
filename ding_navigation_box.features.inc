<?php
/**
 * @file
 * ding_navigation_item.features.inc
 */

/**
 * Implements hook_node_info().
 */
function ding_navigation_item_node_info() {
  $items = array(
    'ding_navigation_item' => array(
      'name' => t('Ding navigation item'),
      'base' => 'node_content',
      'description' => t('Content type that integrates with the "Ding Navigation Box" module and provides the default fields it expects'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
