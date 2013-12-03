<?php
/**
 * @file
 * ding_navigation_box_fields.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function ding_navigation_box_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'ding_navigation_item-ding_navigation_item-field_ding_nav_box_header_text'
  $field_instances['ding_navigation_item-ding_navigation_item-field_ding_nav_box_header_text'] = array(
    'bundle' => 'ding_navigation_item',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'ding_navigation_item',
    'field_name' => 'field_ding_nav_box_header_text',
    'label' => 'Ding nav box header text',
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
      'weight' => -12,
    ),
  );

  // Exported field_instance: 'ding_navigation_item-ding_navigation_item-field_ding_nav_box_links'
  $field_instances['ding_navigation_item-ding_navigation_item-field_ding_nav_box_links'] = array(
    'bundle' => 'ding_navigation_item',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'link',
        'settings' => array(),
        'type' => 'link_default',
        'weight' => 1,
      ),
    ),
    'entity_type' => 'ding_navigation_item',
    'field_name' => 'field_ding_nav_box_links',
    'label' => 'Ding nav box links',
    'required' => 0,
    'settings' => array(
      'attributes' => array(
        'class' => '',
        'configurable_title' => 0,
        'rel' => '',
        'target' => 'default',
        'title' => '',
      ),
      'display' => array(
        'url_cutoff' => 80,
      ),
      'enable_tokens' => 1,
      'rel_remove' => 'default',
      'title' => 'optional',
      'title_maxlength' => 128,
      'title_value' => '',
      'url' => 0,
      'user_register_form' => FALSE,
      'validate_url' => 1,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'link',
      'settings' => array(),
      'type' => 'link_field',
      'weight' => -11,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Ding nav box header text');
  t('Ding nav box links');

  return $field_instances;
}
