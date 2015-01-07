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

