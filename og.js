/**
 * HELPERS
 */

/**
 * Given a group id (usually a node id) this will return true if the current user is
 * a member of the group, false otherwise.
 * @param gid
 * @returns {boolean}
 */
function og_is_member(gid) {
  var member = false;
  var groups = og_config('user_groups');
  if (groups && groups.length) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      if (group.gid == gid) {
        member = true;
        break;
      }
    }
  }
  return member;
}

/**
 * HOOKS
 */

/**
 * Implements hook_install().
 */
function og_install() {
  drupalgap.og = {
    user_groups: null
  };
}

function og_config(key, value) {
  if (typeof value !== 'undefined') { drupalgap.og[key] = value; }
  else { return drupalgap.og[key]; }
}

/**
 * Implements hook_services_request_pre_postprocess_alter().
 */
function og_services_request_pre_postprocess_alter(options, result) {
  // Set aside their groups.
  if (options.service == 'user' && options.resource == 'groups') {
    og_config('user_groups', result);
  }
}

/**
 * Implements hook_services_postprocess().
 */
function og_services_postprocess(options, result) {
  try {
    // Load the authenticated user's groups after the system connect.
    if (options.service == 'system' && options.resource == 'connect') {
      if (Drupal.user.uid) {
        og_user_groups(Drupal.user.uid, {
          success: function(groups) { }
        });
      }
    }
  }
  catch (error) {
    console.log('og_services_postprocess - ' + error);
  }
}

function og_ui_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) {
  try {

    //console.log(entity_type);
    //console.log(entity);
    //console.log(field);
    //console.log(instance);
    //console.log(display);

    var element = {};
    $.each(items, function(delta, item) {

      switch (display.type) {
        case 'og_group_subscribe':

            // Build the subscription button.
            var gid = entity[entity_primary_key(entity_type)];
            element[delta] = { theme: 'og_group_subscribe' };
            var props = og_group_subscribe_button_properties(gid, og_is_member(gid));
            $.extend(element[delta], props, true);

          break;
        default:
          console.log('og_ui_field_formatter_view - unsupported type: ' + display.type);
          break;
      }

      //dpm(delta);
      //console.log(item);

    });
    return element;
  }
  catch (error) { console.log('og_ui_field_formatter_view - ' + error); }
}

function og_group_subscribe_button_properties(gid, member) {
  return {
    text: !member ? 'Subscribe to group' : 'Unsubscribe from group',
    path: null,
    member: member,
    options: {
      attributes: {
        onclick: '_og_group_subscribe_click(this, ' + gid + ', ' + member + ')'
      }
    }
  };
}

/**
 * Themes a subscription link.
 * @param variables
 * @returns {String}
 */
function theme_og_group_subscribe(variables) {
  return bl(variables.text, variables.path, variables.options);
}

/**
 * Given a group id and the user's current membership status, this will
 * do the opposite. For example, if they are not a member this will subscribe them
 * to the group. On the flip side, if they are a member this will unsubscribe them.
 * @param button
 * @param gid
 * @param member
 * @private
 */
function _og_group_subscribe_click(button, gid, member) {
  var done = function(result) {
    var props = og_group_subscribe_button_properties(gid, og_is_member(gid));
    $(button).text(props.text);
    $(button).attr('onclick', props.options.attributes.onclick).trigger('create');
  };
  !member ? og_user_join(gid, Drupal.user.uid, { success: done }) :
      og_user_leave(gid, Drupal.user.uid, { success: done });
}

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

/**
 *
 * @param uid
 * @param options
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

/**
 *
 * @param gid
 * @param uid
 * @param options
 */
function og_user_join(gid, uid, options) {
  var success = options.success.bind({});
  options.method = 'POST';
  options.path = 'og/join/' + gid + '/' + uid;
  options.service = 'og';
  options.resource = 'user_join';
  options.success = function(result) {
    og_user_groups(Drupal.user.uid, {
      success: function(groups) { success(result); }
    });
  };
  Drupal.services.call(options);
}

/**
 *
 * @param gid
 * @param uid
 * @param options
 */
function og_user_leave(gid, uid, options) {
  var success = options.success.bind({});
  options.method = 'POST';
  options.path = 'og/leave/' + gid + '/' + uid;
  options.service = 'og';
  options.resource = 'user_leave';
  options.success = function(result) {
    og_user_groups(Drupal.user.uid, {
      success: function(groups) { success(result); }
    });
  };
  Drupal.services.call(options);
}
