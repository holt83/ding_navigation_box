<?php
/**
 * @file
 * ding_navigation_item.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function ding_navigation_box_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'node-ding_navigation_item-field_ding_nav_box_content'
  $field_instances['node-ding_navigation_item-field_ding_nav_box_content'] = array(
    'bundle' => 'ding_navigation_item',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'The main content of the navigation item. Use this field to display structured content with HTML.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 0,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_ding_nav_box_content',
    'label' => 'ding_nav_box_content',
    'required' => 0,
    'settings' => array(
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'rows' => 15,
      ),
      'type' => 'text_textarea',
      'weight' => 2,
    ),
  );

  // Exported field_instance: 'node-ding_navigation_item-field_ding_nav_box_footer_text'
  $field_instances['node-ding_navigation_item-field_ding_nav_box_footer_text'] = array(
    'bundle' => 'ding_navigation_item',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Displays informational footer text in the navigation box. Use multiple values to display multiple paragraphs.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 2,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_ding_nav_box_footer_text',
    'label' => 'ding_nav_box_footer_text',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 4,
    ),
  );

  // Exported field_instance: 'node-ding_navigation_item-field_ding_nav_box_header_text'
  $field_instances['node-ding_navigation_item-field_ding_nav_box_header_text'] = array(
    'bundle' => 'ding_navigation_item',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Display short informational text in the header. Use multiple values to display multiple paragraphs.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 1,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_ding_nav_box_header_text',
    'label' => 'ding_nav_box_header_text',
    'required' => 0,
    'settings' => array(
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 1,
    ),
  );

  // Exported field_instance: 'node-ding_navigation_item-field_ding_nav_box_side_images'
  $field_instances['node-ding_navigation_item-field_ding_nav_box_side_images'] = array(
    'bundle' => 'ding_navigation_item',
    'deleted' => 0,
    'description' => 'Displays images in the right side of the navigation box.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'image',
        'settings' => array(
          'image_link' => '',
          'image_style' => '',
        ),
        'type' => 'image',
        'weight' => 3,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_ding_nav_box_side_images',
    'label' => 'ding_nav_box_side_images',
    'required' => 0,
    'settings' => array(
      'alt_field' => 0,
      'default_image' => 0,
      'file_directory' => 'ding-navigation-box',
      'file_extensions' => 'png gif jpg jpeg',
      'max_filesize' => '',
      'max_resolution' => '',
      'min_resolution' => '50x50',
      'title_field' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'image',
      'settings' => array(
        'preview_image_style' => '',
        'progress_indicator' => 'throbber',
      ),
      'type' => 'image_image',
      'weight' => 3,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Display short informational text in the header. Use multiple values to display multiple paragraphs.');
  t('Displays images in the right side of the navigation box.');
  t('Displays informational footer text in the navigation box. Use multiple values to display multiple paragraphs.');
  t('The main content of the navigation item. Use this field to display structured content with HTML.');
  t('ding_nav_box_content');
  t('ding_nav_box_footer_text');
  t('ding_nav_box_header_text');
  t('ding_nav_box_side_images');

  return $field_instances;
}
