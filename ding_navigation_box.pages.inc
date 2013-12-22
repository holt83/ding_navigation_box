<?php

/**
 * @file
 *
 * Defines the forms and callback functions for the Ding navigation box module.
 */

/**
 * Form builder: Form for editing a Ding navigation item.
 */
function ding_navigation_item_form($form, &$form_state, $ding_navigation_item) {
  if (!isset($form_state['ding_navigation_item'])) {
    $form_state['ding_navigation_item'] = $ding_navigation_item;
  }
  $ding_navigation_item = $form_state['ding_navigation_item'];
  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#default_value' => $ding_navigation_item->title,
    '#description' => t('The full title of the navigation item.'),
    '#weight' => -15,
    '#required' => TRUE,
    '#maxlength' => 24,
    '#size' => 40,
  );
  $form['abbreviation'] = array(
    '#type' => 'textfield',
    '#title' => t('Title abbreviation'),
    '#default_value' => $ding_navigation_item->abbreviation,
    '#description' => t('An abbreviation of the full title to display on small screens.'),
    '#weight' => -14,
    '#required' => TRUE,
    '#maxlength' => 6,
    '#size' => 12,
  );
  $form['buttons'] = array();
  $form['buttons']['#weight'] = 100;
  $form['buttons']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
    '#weight' => 5,
    '#submit' => array('ding_navigation_item_form_submit'),
  );
  $form['buttons']['cancel'] = array(
    '#type' => 'submit',
    '#value' => t('Cancel'),
    '#submit' => array('ding_navigation_item_form_cancel'),
  );
  $form['#validate'][] = 'ding_navigation_item_form_validate'; 
  // Let the Field API attach fields assigned to the ding navigation item entity
  field_attach_form('ding_navigation_item', $ding_navigation_item, $form, $form_state);
  // Continue the breadcrumb trail from the previous admin pages.
  $breadcrumb = array();
  $breadcrumb[] = l(t('Home'), '<front>');
  $breadcrumb[] = l(t('Administration'), 'admin');
  $breadcrumb[] = l(t('Structure'), 'admin/structure');
  // Pass the position of the item that is being edited to the admin page, to
  // show the correct item in the navigation box.
  $breadcrumb[] = l(t('Navigation box admin'), DING_NAV_BOX_ADMIN_URI . '/' . $ding_navigation_item->position);
  drupal_set_breadcrumb($breadcrumb);
  return $form;
}

function ding_navigation_item_form_validate($form, &$form_state) {
  $ding_navigation_item = $form_state['ding_navigation_item'];
  // Let the Field API perform validation on the data submitted by the form.
  field_attach_form_validate('ding_navigation_item', $ding_navigation_item, $form, $form_state);
}

/**
 * Submit handler for the submit button on the ding_navigation_item form.
 */
function ding_navigation_item_form_submit($form, &$form_state) {
  $ding_navigation_item = $form_state['ding_navigation_item'];
  $ding_navigation_item->title = $form_state['values']['title'];
  $ding_navigation_item->abbreviation = $form_state['values']['abbreviation'];
  // Let the Field API perform necessary operations on the data submitted by
  // the form
  field_attach_submit('ding_navigation_item', $ding_navigation_item, $form, $form_state);
  // Save and go back.
  ding_navigation_item_save($ding_navigation_item);
  $form_state['redirect'] = DING_NAV_BOX_ADMIN_URI . '/' . $ding_navigation_item->position;
}

/**
 * Submit handler for the cancel button on the ding_navigation_item form.
 */
function ding_navigation_item_form_cancel($form, &$form_state) {
  $ding_navigation_item = $form_state['ding_navigation_item'];
  $form_state['redirect'] = DING_NAV_BOX_ADMIN_URI . '/'. $ding_navigation_item->position; 
}

/**
 * Menu callback: admin/structure/ding-navigation-box/manage/navigation-box.
 */
function ding_navigation_box_page_manage($form, &$form_state, $active_item_position = 1) {
  $ding_navigation_items = _ding_navigation_box_get_items_as_render_array(TRUE);
  $form['ding_navigation_box_admin']['#prefix'] = '<div id=\'ding-navigation-box-admin\'>';
  $form['ding_navigation_box_admin']['#suffix'] = '</div>';

  // Get the acitve navigation item specified by the $active_item_position 
  // parameter.
  $i = 1;
  $found = FALSE;
  while (!$found) {
    $current_item = $ding_navigation_items['activation_areas'][$i]['#item'];
    if ($current_item->position == $active_item_position) {
      $active_item = $current_item;
      $found = TRUE;
    }
    $i++;
  }

  // Setup the edit link to point to the active navigation item.
  $form['ding_navigation_box_admin']['edit_link'] = array(
    '#theme' => 'link',
    '#text' => 'Edit ' . $active_item->title,
    '#path' => DING_NAV_BOX_ADMIN_URI . '/edit/' . $active_item->dniid,
    '#options' => array(
      'attributes' => array(
        'class' => 'button', 
        'id' => 'edit-item-link',
      ), 
      'html' => FALSE),
  );

  $form['ding_navigation_box_admin']['move_up_link'] = array(
    '#prefix' => "<a id='move-up-link' class='move-link button' href='#'>",
    '#suffix' => '</a>',
    '#markup' => 'Move up',
  );
  $form['ding_navigation_box_admin']['move_down_link'] = array(
    '#prefix' => "<a id='move-down-link' class='move-link button' href='#'>",
    '#suffix' => '</a>',
    '#markup' => 'Move down',
  );  

  // Setup render array for the navigation box.
  $form['ding_navigation_box_admin']['ding_navigation_box'] = array(
    '#theme' => 'ding_navigation_box',
    'activation_areas' => $ding_navigation_items['activation_areas'],
    'content_areas' => $ding_navigation_items['content_areas'],
  );

  // Javascript and CSS.
  $settings = array('activeItemPosition' => $active_item_position); // Javascript settings
  $form['#attached']['js'] = _ding_navigation_box_get_javascript(TRUE, $settings);
  $form['#attached']['css'] = _ding_navigation_box_get_css(TRUE);
  return $form;
}

/**
 * Ajax callback function to change position of navigation items.
 */
function ding_navigation_box_change_position_callback() {
  // Get the navigation item to change position on.
  $active_item_id = $_POST['activeItemID'];
  $active_item = ding_navigation_item_load($active_item_id);
  $active_item_position = $active_item->position;
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'ding_navigation_item');
  // Get the change position action ('up' or 'down').
  $change_position_action = $_POST['changePositionAction'];
  // If the action is up we need the item before the position to change.
  if ($change_position_action == 'up') {
    $query->propertyCondition('position', $active_item_position - 1);
  }
  // IF the action is down we need the item after the position to change.
  else if ($change_position_action == 'down') {
    $query->propertyCondition('position', $active_item_position + 1);
  }
  $result = $query->execute();
  if (isset($result['ding_navigation_item'])) {
    // Get the first element of the result array.
    $dniid = array_shift(array_values($result['ding_navigation_item']));
    $ding_navigation_item = ding_navigation_item_load(array($dniid->dniid));
    if ($change_position_action == "up") {
      $active_item->position -= 1;
      $ding_navigation_item->position += 1;
    }
    else if ($change_position_action == "down") {
      $active_item->position += 1;
      $ding_navigation_item->position -= 1;
    }
    // Save the new position of the other item in a temporary variable. This is
    // to avoid unique key violation in the database.
    // TODO: Remove unique key constraint on position field in the database or 
    // make a tranceaction instead to avoid having to do this.
    $temp = $ding_navigation_item->position;
    $ding_navigation_item->position = 0;
    ding_navigation_item_save($ding_navigation_item);
    ding_navigation_item_save($active_item);
    $ding_navigation_item->position = $temp;
    ding_navigation_item_save($ding_navigation_item);
    // The item position was chanhed successfully, and we communicate that to 
    // the client.
    drupal_json_output('success');  
  }
  // If there was no navigation items returned from the enity query, the 
  // requested position change was not possible. Communicate this to the client
  // by sending an error string.
  else {
    drupal_json_output('error');   
  }
}