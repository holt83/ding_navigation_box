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

  // If there was an id supplied, load the start ding navigation item.
  if ($start_item_id != NULL) {
		$start_navigation_item = ding_navigation_item_load($start_item_id);
  }
	// If there wasn't an id for a start navigation item supplied from the url,
	// check settings.
  else if ($start_item_id = variable_get('ding_nav_box_start_navigation_item', FALSE)) {
  	$start_navigation_item = ding_navigation_item_load($start_item_id);   	      
  }
  // As a last resort, show the item that currently has position 1.
  else {
    $start_navigation_item = array_shift(array_values(ding_navigation_item_field_query()));
  }  

  // Setup the edit link to point to the start navigation item.
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
  $navigation_items_render = ding_navigation_item_get_items_render_array(TRUE);
  $form['ding_navigation_box_admin']['ding_navigation_box'] = array(
    '#theme' => 'ding_navigation_box',
    'activation_areas' => $navigation_items_render['activation_areas'],
    'content_areas' => $navigation_items_render['content_areas'],
  );

  // Change start navigation item.
  $form['start_navigation_item'] = array(
  	'#type' => 'fieldset',
  	'#title' => t('Start navigation item'),
  );
  $options = array();
  foreach ($navigation_items_render['navigation_items'] as $navigation_item) {
  	$options[$navigation_item->dniid] = $navigation_item->title;
  }
  $form['start_navigation_item']['change_start_navigation_item'] = array(
  	'#type' => 'select',
  	'#description' => t('Select the item that starts as active, when the 
  		navigation box is rendered'),  	
  	'#options' => $options,
  	'#default_value' => variable_get('ding_nav_box_start_navigation_item', $start_navigation_item->dniid),
  );

  // Setup dias show settings.
  $form['dias_show'] = array(
  	'#type' => 'fieldset',
  	'#title' => t('Navigation item dias show'),    	
  );
  $form['dias_show']['dias_show_enable'] = array(
  	'#type' => 'checkbox',
  	'#description' => t('Change various settings for the navigation item dias show'),
  	'#title' => t('Enable dias show'),
  	'#default_value' => FALSE,
  );
  $form['dias_show']['dias_show_set_interval'] = array(
  	'#type' => 'textfield',
  	'#title' => t('Dias show interval'),
  	'#description' => t('Adjust the time interval in milliseconds between navigation items'),
  	'#default_value' => variable_get('ding_nav_box_dias_show_interval', 10000),
  	'#size' => 18,
  	'#states' => array(
  		'visible' => array(
  			':input[name="dias_show_enable"]' => array('checked' => TRUE),
  		),
  	),    	
  );

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
  	'#submit' => array('ding_navigation_box_page_manage_cancel'),
  );

  $form['#validate'][] = 'ding_navigation_box_page_manage_validate';

  $settings = array('startItem' => $start_navigation_item);
  $form['#attached']['js'] = _ding_navigation_box_get_javascript(TRUE, $settings);
  $form['#attached']['css'] = _ding_navigation_box_get_css(TRUE);

  return $form;
}

/**
 * Ajax callback function to change position of navigation items.
 */
function ding_navigation_box_change_position_callback() {
	// If the required json data isn't supplied ignore the request and send an
	// error message.
	if (!isset($_POST['activeItemID']) || !isset($_POST['changePositionAction'])) {
		// TODO: Do something better here..
		return t('Error. Missing data...');
	}

	// Get the json data from the POST request.
	$active_item_id = $_POST['activeItemID'];
	$change_position_action = $_POST['changePositionAction'];

  // Get the navigation item to change position on.
  $active_item = ding_navigation_item_load($active_item_id);
  $active_item_position = $active_item->position;

  // Get the other navigation item affected by the change in position.
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'ding_navigation_item');
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

    // Switch the positions.
    if ($change_position_action == "up") {
      $active_item->position--;
      $other_item->position++;
    }
    else if ($change_position_action == "down") {
      $active_item->position++;
      $other_item->position--;
    }        

    // Save the new position of the other item in a temporary variable. This is
    // to avoid unique key violation in the database.
    // TODO: Remove unique key constraint on position field in the database or 
    // make a transaction instead to avoid having to do this.
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

/**
 * Submit callback for the ding_navigation_box_page_manage form.
 */
function ding_navigation_box_page_manage_submit($form, &$form_state) {
	$new_start_item_id = $form_state['values']['change_start_navigation_item'];
	$old_start_item_id = variable_get('ding_nav_box_start_navigation_item', FALSE);
	// Change the setting if there was no start item in settings or if the new
	// value is different than the existing one.
	if (!$old_start_item_id || $old_start_item_id != $new_start_item_id) {
		$new_start_item = ding_navigation_item_load($new_start_item_id);
		variable_set('ding_nav_box_start_navigation_item', $new_start_item_id);		
		drupal_set_message(t("<em>@start_item</em> was saved as the new start navigation item", 
			array(
				'@start_item' => $new_start_item->title
			)), 
		  'status'
		);
	}
	$form_state['redirect'] = 'admin/structure/ding-navigation-box';
}

/**
 * Cancel callback for the ding_navigation_box_page_manage form.
 */
function ding_navigation_box_page_manage_cancel($form, &$form_state) {
	$form_state['redirect'] = 'admin/structure';
}

/**
 * Validation callback for the ding_navigation_box_page_manage form.
 */
function ding_navigation_box_page_manage_validate($form, &$form_state) {
	// Nothing to do here yet.
}