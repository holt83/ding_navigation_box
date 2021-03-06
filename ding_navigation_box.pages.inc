<?php

/**
 * @file
 *
 * Defines the forms and callback functions for the Ding navigation box module.
 */

/**
 * Form builder: Form for editing a Ding navigation item.
 */
function ding_navigation_item_form($form, &$form_state, $navigation_item) {
  if (!isset($form_state['navigation_item'])) {
    $form_state['navigation_item'] = $navigation_item;
  }
  $navigation_item = $form_state['navigation_item'];

  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#default_value' => $navigation_item->title,
    '#description' => t('The full title of the navigation item.'),
    '#weight' => -15,
    '#required' => TRUE,
    '#maxlength' => 24,
    '#size' => 40,
  );
  $form['abbreviation'] = array(
    '#type' => 'textfield',
    '#title' => t('Title abbreviation'),
    '#default_value' => $navigation_item->abbreviation,
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
  field_attach_form('ding_navigation_item', $navigation_item, $form, $form_state);
  
  // Continue the breadcrumb trail from the previous admin pages.
  $breadcrumb = array();
  $breadcrumb[] = l(t('Home'), '<front>');
  $breadcrumb[] = l(t('Administration'), 'admin');
  $breadcrumb[] = l(t('Structure'), 'admin/structure');
  // Pass the position of the item that is being edited to the admin page, to
  // show the correct item in the navigation box.
  $breadcrumb[] = l(t('Navigation box admin'), DING_NAV_BOX_ADMIN_PATH . '/' . $navigation_item->dniid);
  drupal_set_breadcrumb($breadcrumb);
  return $form;
}

function ding_navigation_item_form_validate($form, &$form_state) {
  $navigation_item = $form_state['navigation_item'];
  // Let the Field API perform validation on the data submitted by the form.
  field_attach_form_validate('ding_navigation_item', $navigation_item, $form, $form_state);
}

/**
 * Submit handler for the submit button on the ding_navigation_item form.
 */
function ding_navigation_item_form_submit($form, &$form_state) {
  $navigation_item = $form_state['navigation_item'];
  $navigation_item->title = $form_state['values']['title'];
  $navigation_item->abbreviation = $form_state['values']['abbreviation'];
  // Let the Field API perform necessary operations on the data submitted by
  // the form
  field_attach_submit('ding_navigation_item', $navigation_item, $form, $form_state);
  // Save and go back.
  ding_navigation_item_save($navigation_item);
  drupal_set_message(t("<em>@navigation_item</em> was saved successfully.", 
    array('@navigation_item' => $navigation_item->title)), 'status');
  $form_state['redirect'] = DING_NAV_BOX_ADMIN_PATH . '/' . $navigation_item->dniid;
}

/**
 * Submit handler for the cancel button on the ding_navigation_item form.
 */
function ding_navigation_item_form_cancel($form, &$form_state) {
  $navigation_item = $form_state['navigation_item'];
  $form_state['redirect'] = DING_NAV_BOX_ADMIN_PATH . '/'. $navigation_item->dniid; 
}

/**
 * Menu callback: admin/structure/ding-navigation-box/manage/navigation-box.
 */
function ding_navigation_box_page_manage($form, &$form_state, $start_item_id = NULL) {
  $form['#prefix'] = '<div id=\'ding-navigation-box-admin\'>';
  $form['#suffix'] = '</div>';

  // If there was a start item id supplied from the url, the item with that ID
  // is currently being edited and should be the active one. 
  if (isset($start_item_id)) {
  	$start_item = ding_navigation_item_load($start_item_id);
  }
  // Else use the start item admin setting stored in the database.
  else {
  	$start_item = ding_navigation_item_get_start_item();
  }

  $navigation_items = ding_navigation_item_get_items();

  // Change start navigation item admin setting.
  $form['start_navigation_item'] = array(
    '#type' => 'fieldset',
    '#title' => t('Start navigation item'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,    
  );
  $options = array();
  foreach ($navigation_items as $dniid => $navigation_item) {
    $options[$dniid] = $navigation_item->title;
  }
  $form['start_navigation_item']['change_start_navigation_item'] = array(
    '#type' => 'select',
    '#description' => t('Select the item that should start as active.'),   
    '#options' => $options,
    '#default_value' => ding_navigation_item_get_start_item()->dniid,
  );

  // Setup slideshow settings.
  $form['slideshow'] = array(
    '#type' => 'fieldset',
    '#title' => t('Navigation item slideshow'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['slideshow']['slideshow_enable'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable slideshow'),
    '#default_value' => variable_get('ding_navigation_box_slideshow_enable', FALSE),
  );
  $options = array();
  for ($i = 0; $i < 12; $i++) { 
    $seconds = $i ? 5 * $i : 1; // 1 second -> 55 seconds
    $options[$seconds] = format_plural($seconds, '1 second', '@count seconds');
  }
  for ($i = 1; $i < 6; $i++) {
    $seconds = 60 * $i; // 1 minute -> 5 minutes
    $options[$seconds] = format_plural($i, '1 minute', '@count minutes');
  }
  $options[60] = t('1 minute');
  $form['slideshow']['set_interval'] = array(
    '#type' => 'select',
    '#title' => t('Slideshow interval'),
    '#description' => t('Select the time in seconds between items.'),
    '#default_value' => variable_get('ding_navigation_box_slideshow_interval', 10),
    '#options' => $options,
  );
  $form['slideshow']['demo_title'] = array(
    '#prefix' => "<label>",
    '#suffix' => '</label>',
    '#markup' => t('Slideshow demo'),
  );    
  $form['slideshow']['demo'] = array(
    '#prefix' => "<a id='slideshow-demo' class='slideshow-demo-button button' href='#'>",
    '#suffix' => '</a>',
    '#markup' => t('Start'),    
  );
  $form['slideshow']['demo_description'] = array(
    '#prefix' => "<div class='description'>",
    '#suffix' => '</div>',
    '#markup' => t('Test the item slideshow settings.'),
  );    

  // Submit
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

  $form['seperator'] = array(
    '#markup' => "<hr><br>",
  );

  // Setup the edit link to point to the start item.
  $form['edit_link'] = array(
    '#theme' => 'link',
    '#text' => 'Edit ' . $start_item->title,
    '#path' => DING_NAV_BOX_ADMIN_PATH . '/edit/' . $start_item->dniid,
    '#options' => array(
      'attributes' => array(
        'class' => 'button', 
        'id' => 'edit-item-link',
      ), 
      'html' => FALSE),
  );

  // Attach the AJAX enabled 'change item position' button links.
  $form['move_item_up'] = array(
    '#prefix' => "<a id='move-item-up' class='move-item-button button' href='#'>",
    '#suffix' => '</a>',
    '#markup' => 'Move up',
  );
  $form['move_item_down'] = array(
    '#prefix' => "<a id='move-item-down' class='move-item-button button' href='#'>",
    '#suffix' => '</a>',
    '#markup' => 'Move down',
  );
  // AJAX message area.
  $form['change_position_info'] = array(
  	'#prefix' => "<span id='change-position-info'>",
  	'#suffix' => '</span>',
  );

  // Setup render array for the navigation box.  
  $form['ding_navigation_box'] = array(
  	'#theme' => 'ding_navigation_box',
  	'#items' => $navigation_items,
  	'#admin' => TRUE,
  	'#start_item_position' => $start_item->position,
    '#slideshow' => FALSE,
    '#slideshow_interval' => ding_navigation_box_get_slideshow_interval(),
  );

  return $form;
}

/**
 * Submit callback for the ding_navigation_box_page_manage form.
 */
function ding_navigation_box_page_manage_submit($form, &$form_state) {
  // Start item setting.
  $new_start_item_id = $form_state['values']['change_start_navigation_item'];
  $old_start_item_id = variable_get('ding_navigation_box_start_item_id', FALSE);
  // Change the setting if the new value is different from the existing one.
  if ($old_start_item_id != $new_start_item_id) {
    $new_start_item = ding_navigation_item_load($new_start_item_id);
    variable_set('ding_navigation_box_start_item_id', $new_start_item_id);    
    drupal_set_message(t("<em>@start_item</em> is the new start navigation item", 
      array('@start_item' => $new_start_item->title)), 'status');
  }

  // Slideshow enabke/disable
  $enable = $form_state['values']['slideshow_enable'];
  $old_enable = variable_get('ding_navigation_box_slideshow_enable', FALSE);  
  if ($enable != $old_enable) {
    variable_set('ding_navigation_box_slideshow_enable', $enable);
    drupal_set_message(t('The slideshow was @status', array(
      '@status' => ($enable ? 'enabled' : 'disabled'))), 'status');
  }  
  // Slideshow interval
  $interval = $form_state['values']['set_interval'];  
  $old_interval = variable_get('ding_navigation_box_slideshow_interval', 10);
  if ($interval != $old_interval) {
    variable_set('ding_navigation_box_slideshow_interval', $interval);
    $label = $form_state['complete form']['slideshow']['set_interval']
      ['#options'][$interval];
    drupal_set_message(t('The slideshow interval was changed to @label', array(
      '@label' => $label)), 'status');          
  }    

  // Redirect needed because there might be a wildcard.
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

/**
 * Ajax callback function to change position of navigation items.
 */
function ding_navigation_box_change_position_callback() {
  // Test for precense of required parameters.
	if (!isset($_POST['itemID']) || !isset($_POST['action'])) {
		drupal_json_output('error');
    return FALSE;
	}
	// Get the json parameters from the POST request.
	$dniid = $_POST['itemID'];
	$action = $_POST['action'];
  // Validate $item_id to be a positíve integer.
  if ($dniid !== '' && (!is_numeric($dniid) || intval($dniid) != $dniid || $dniid <= 0)) {
      drupal_json_output('error');
      return FALSE;
  }
  $accepted_actions = array('up', 'down');
  if (!in_array($action, $accepted_actions)) {
    drupal_json_output('error');
    return FALSE;
  }

  // Get the navigation item to change position on.
  if (!$item = ding_navigation_item_load($dniid)) {
    drupal_json_output('error');
    return FALSE;
  }

  // Get the other item affected by the position change.
  $direction = ($action == 'down' ? 1 : -1);	
  if (!$other = ding_navigation_item_get_item_position($item->position + $direction)) {
    drupal_json_output('error');
    return FALSE;
  }

  // Switch the positions.
  $item->position = $item->position + $direction;
  $other->position = $other->position - $direction;
  // Use a transaction to save the position values to the database, to avoid 
  // inconsistent state of the ding navigation item table.
  $transaction = db_transaction();
  try {
    // To avoid unique key violation we store the position of the other item
    // and temporarely save it to database with position 0. 
    $temp = $other->position;
    $other->position = 0;
    ding_navigation_item_save($other);
    ding_navigation_item_save($item);
    $other->position = $temp;
    ding_navigation_item_save($other);
    // Item positions changed successfully.
    drupal_json_output('success');                    
  } 
  catch (Exception $e) {
    // There was a problem during the transaction. Rollback and send error to
    // the browser. 
    $transaction->rollback();
    drupal_json_output('error');        
  }
}
