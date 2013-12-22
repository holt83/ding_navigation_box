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
  $breadcrumb[] = l(t('Navigation box admin'), DING_NAV_BOX_ADMIN_PATH . '/' . $ding_navigation_item->dniid);
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
  $form_state['redirect'] = DING_NAV_BOX_ADMIN_PATH . '/' . $ding_navigation_item->dniid;
}

/**
 * Submit handler for the cancel button on the ding_navigation_item form.
 */
function ding_navigation_item_form_cancel($form, &$form_state) {
  $ding_navigation_item = $form_state['ding_navigation_item'];
  $form_state['redirect'] = DING_NAV_BOX_ADMIN_PATH . '/'. $ding_navigation_item->dniid; 
}

/**
 * Menu callback: admin/structure/ding-navigation-box/manage/navigation-box.
 */
function ding_navigation_box_page_manage($form, &$form_state, $start_item_id = NULL) {
  $form['ding_navigation_box_admin']['#prefix'] = '<div id=\'ding-navigation-box-admin\'>';
  $form['ding_navigation_box_admin']['#suffix'] = '</div>';

  // Find the first item in the navigation box (position = 1).
	$query = new EntityFieldQuery();
	$query->entityCondition('entity_type', 'ding_navigation_item')
	      ->propertyCondition('position', '1');
	$result = $query->execute();
  $dniid = array_shift(array_values($result['ding_navigation_item']));
  $first_item = ding_navigation_item_load($dniid->dniid);	

  // If there wasn't an id for a start navigation item supplied from the url 
  // argument, default to start with the first item loaded above.
  if ($start_item_id == NULL) {
		$start_navigation_item = $first_item;   	      
  }
  // If there was an id supplied, load the start ding navigation item.
  else {
  	$start_navigation_item = ding_navigation_item_load($start_item_id);
  }

  // Setup the edit link to point to the active navigation item.
  $form['ding_navigation_box_admin']['edit_link'] = array(
    '#theme' => 'link',
    '#text' => 'Edit ' . $start_navigation_item->title,
    '#path' => DING_NAV_BOX_ADMIN_PATH . '/edit/' . $start_navigation_item->dniid,
    '#options' => array(
      'attributes' => array(
        'class' => 'button', 
        'id' => 'edit-item-link',
      ), 
      'html' => FALSE),
  );

  // Attach the change item position links.
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
  $form['ding_navigation_box_admin']['change_position_info'] = array(
  	'#prefix' => "<span id='change-position-info'>",
  	'#suffix' => '</span>',
  );

  // Setup render array for the navigation box.
  $ding_navigation_items_render = _ding_navigation_box_get_items_as_render_array(TRUE);
  $form['ding_navigation_box_admin']['ding_navigation_box'] = array(
    '#theme' => 'ding_navigation_box',
    'activation_areas' => $ding_navigation_items_render['activation_areas'],
    'content_areas' => $ding_navigation_items_render['content_areas'],
  );

  // Change start navigation item.
  $form['start_navigation_item'] = array(
  	'#type' => 'fieldset',
  	'#title' => t('Start navigation item'),
  );
  $options = array();
  foreach ($ding_navigation_items_render['activation_areas'] as $activation_area) {
  	$item = $activation_area['#item'];
  	$options[$item->dniid] = $item->title;
  }
  $form['start_navigation_item']['change_start_navigation_item'] = array(
  	'#type' => 'select',
  	'#description' => t('Adjust which navigation item should start out as active.'),  	
  	'#options' => $options,
  	// If no item is set default to the first item fetched earlier.
  	'#default_value' => variable_get('ding_nav_box_start_item', $first_item->dniid),
  );

  // Save settings
  $form['save_settings'] = array(
  	'#weight' => 100,
  );
  $form['save_settings']['save'] = array(
  	'#type' => 'submit',
  	'#value' => t('Save'),
  	'#weight' => 5,
  	'#submit' => array('ding_navigation_box_page_manage_submit'),
  );
  $form['save_settings']['cancel'] = array(
  	'#type' => 'submit',
  	'#value' => t('Cancel'),
  	'#submit' => array('ding_navigation_box_page_manage_submit'),
  );

  // Javascript and CSS.
  $settings = array('activeItemPosition' => $start_navigation_item->position);
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
  // If the action is up the item should switch places with the item before.
  if ($change_position_action == 'up') {
    $query->propertyCondition('position', $active_item_position - 1);
  }
  // If the action is down it should switch places with the item after.
  else if ($change_position_action == 'down') {
    $query->propertyCondition('position', $active_item_position + 1);
  }
  $result = $query->execute();

  if (isset($result['ding_navigation_item'])) {
    // Get the first element of the result array.
    $dniid = array_shift(array_values($result['ding_navigation_item']));
    $other_item = ding_navigation_item_load(array($dniid->dniid));

    // Switch position of the items based on the change position action passed
    // from Javascript.
    if ($change_position_action == "up") {
      $active_item->position -= 1;
      $other_item->position += 1;
    }
    else if ($change_position_action == "down") {
      $active_item->position += 1;
      $other_item->position -= 1;
    }

    // Save the new position of the other item in a temporary variable. This is
    // to avoid unique key violation in the database.
    // TODO: Remove unique key constraint on position field in the database or 
    // make a tranceaction instead to avoid having to do this.
    $temp = $other_item->position;
    $other_item->position = 0; // Use 0 since this will never be used
    ding_navigation_item_save($other_item);
    ding_navigation_item_save($active_item);
    $other_item->position = $temp;
    ding_navigation_item_save($other_item);
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