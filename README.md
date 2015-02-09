og
==

The Organic Groups module for DrupalGap.

# Drupal Setup (optional)

Step 1: Enable the Organic Groups Services module:

https://www.drupal.org/project/og_services

Step 2: Go to `admin/structure/services/list/drupalgap/resources` and optionally
enable the following resources based on your needs:

- og
 - create
 - retrieve
 - update
 - delete
 - index
 - join
 - leave
 - users
- user
 - groups

Step 3: Flush all of Drupal's caches.

# DrupalGap Setup

Step 1: Download the Organic Groups module for DrupalGap:

https://github.com/signalpoint/og

Step 2: Unzip the module so it lives here:

```
app/modules/og
```

Step 3: Add the module to the `app/settings.js` file:

```
Drupal.modules.contrib['og'] = {};
```
# Organic Group Entity Reference Fields (aka Group Audience)

If you have a Group Audience field on your content type, and have its form
widget set to an entity reference field, install the Entity Reference module in
your DrupalGap app and follow its instructions.Be sure to change the field's
widget to "Autocomplete", by default it is probably set as "OG reference".

