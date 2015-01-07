/**
 * HOOKS
 */

/**
 * Implements hook_field_widget_form().
 */
function og_field_widget_form(form, form_state, field, instance, langcode, items, delta, element) {
  try {
    //console.log(field);
    //console.log(instance);
    switch (instance.widget.type) {
      case 'og_complex':
        // Just forward this widget to the entity reference module.
        entityreference_field_widget_form(form, form_state, field, instance, langcode, items, delta, element);
        break;
      default:
        console.log('og_field_widget_form - unknown widget type (' + instance.widget.type + ')');
        return;
        break;
    }
  }
  catch (error) { console.log('og_field_widget_form - ' + error); }
}

/**
 * Implements hook_assemble_form_state_into_field().
 */
function og_assemble_form_state_into_field(entity_type, bundle,
  form_state_value, field, instance, langcode, delta, field_key) {
  try {
    // Just forward this field's assembly to the entity reference module.
    return entityreference_assemble_form_state_into_field(entity_type, bundle,
      form_state_value, field, instance, langcode, delta, field_key);
  }
  catch (error) { console.log('entityreference_assemble_form_state_into_field - ' + error); }
}
 
/**
 * SERVICES
 */
function og_user_groups(uid, options) {
  try {
    options.method = 'GET';
    options.path = 'user/' + uid + '/groups.json';
    options.service = 'user';
    options.resource = 'groups';
    Drupal.services.call(options);
  }
  catch (error) { console.log('og_user_groups - ' + error); }
}

