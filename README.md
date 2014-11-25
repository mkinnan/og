og
==

The Organic Groups module for DrupalGap.

# Drupal Setup

Step 1: Enable the Organic Groups Services module:

https://www.drupal.org/project/og_services

Step 2: Go to `admin/structure/services/list/drupalgap/resources` and enable the
following permissions based on your needs:

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

Step 3: Enable the `DrupalGap Organic Groups` sub module that comes with the
DrupalGap module.

Step 4: Flush all of Drupal's caches.

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

