<?php

/**
 * @file
 *
 * Contains preprocess functions for Ding navigation box templates.
 */

/**
 * Module template preprocess funtion for the navigation box.
 */
function template_preprocess_ding_navigation_box(&$variables) {
  $element = $variables['element'];
  if (empty($element['activation_areas']) || empty($element['content_areas'])) {
    $variables['activation_areas'] = $variables['content_areas'] = FALSE;
  }
  else {
    $variables['activation_areas'] = $element['activation_areas'];
    $variables['content_areas'] = $element['content_areas'];
  }
}

/**
 * Module template preprocess function for an activation area.
 */
function template_preprocess_ding_nav_box_activation_area(&$variables) {
  $variables['classes_array'][] = 'activation-area';
  // Get the ding navigation item this activation area belongs to.
  $item = $variables['item'];
  $variables['title'] = $item->title;
  $variables['abbreviation'] = $item->abbreviation;
  // If the navigation box is being rendered in admin ui, add a custom data
  // attribute with the ding navigation item id.
  if ($variables['admin']) {
    $variables['attributes_array'] += array(
      'data-dniid' => $item->dniid,
    );
  }
}

/**
 * Module template preprocess function for a content area.
 */
function template_preprocess_ding_nav_box_content_area(&$variables) {
  $variables['classes_array'][] = 'content-area';
  // Get the ding navigation item this content area belongs to.
  $item = $variables['item'];
  // Expose our internal title field to the template.
  $variables['title'] = $item->title;

  // Expose the data from the field_ding_nav_box_header_text field to the template.
  $field_items = field_get_items('ding_navigation_item', $item, 'field_ding_nav_box_header_text');
  if ($field_items) {
    $variables['header_text'] = array();
    foreach ($field_items as $field_item) {
      // Prepare the field item for viewing.
      $field_item = field_view_value('ding_navigation_item', $item, 'field_ding_nav_box_header_text', $field_item);
      $variables['header_text'][] = array(
        '#type' => 'markup',
        '#markup' => '<p>' . $field_item['#markup'] . '</p>',
      );
    }
  }

  // Expose the bottom links to the template.
  $field_items = field_get_items('ding_navigation_item', $item, 'field_ding_nav_box_links');
  if ($field_items) {
    $variables['links'] = array();
    foreach ($field_items as $field_item) {
      $field_item = field_view_value('ding_navigation_item', $item, 'field_ding_nav_box_links', $field_item);
      $variables['links'][] = $field_item;
    }
  }
}