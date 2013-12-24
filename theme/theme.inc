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
  // Prepare the render arrays for the navgation items and expose them.
  $navigation_items = $variables['items'];  
  $activation_areas = array();
  $content_areas = array();
  $admin = isset($variables['admin']) ? $variables['admin'] : FALSE;
  foreach ($navigation_items as $navigation_item) {
    $common = array('#item' => $navigation_item, '#admin' => $admin);
    $activation_areas[] = array(
      '#theme' => 'ding_nav_box_activation_area',
    ) + $common;
    $content_areas[] = array(
      '#theme' => 'ding_nav_box_content_area',
    ) + $common;
  }
  $variables['activation_areas'] = $activation_areas;
  $variables['content_areas'] = $content_areas;


  $css_options = array('group' => CSS_DEFAULT, 'type' => 'file');
  $js_options = array('group' => JS_DEFAULT, 'type' => 'file');
  drupal_add_css(DING_NAV_BOX_PATH . '/css/ding-navigation-box.css', $css_options);
  drupal_add_js(DING_NAV_BOX_PATH . '/js/ding-navigation-box.js', $js_options);  
  if ($admin) {
    drupal_add_css(DING_NAV_BOX_PATH . '/css/ding-navigation-box-admin.css', $css_options);
    drupal_add_js(DING_NAV_BOX_PATH . '/js/ding-navigation-box-admin.js', $js_options);
  }
  if (isset($variables['start_item'])) {
    $start_item = $variables['start_item'];
  }
  else if ($start_item_id = variable_get('ding_nav_box_start_navigation_item', FALSE)) {
    $start_item = ding_navigation_item_load($start_item_id);
  }
  else {
    $start_item = ding_navigation_item_field_query();
  }
  $js_settings = array(
    'dingNavigationBox' => array(
      'startItemPosition' => $start_item->position,
      'adminPath' => $admin ? DING_NAV_BOX_ADMIN_PATH : '/',
    ),
  );
  drupal_add_js($js_settings, 'setting');  
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