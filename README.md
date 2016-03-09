The Organic Groups module for DrupalGap.

# Drupal Setup

## Step 0

Enable the DrupalGap Organic Groups module, which is a sub module that is included with the DrupalGap module.

http://drupal.org/project/drupalgap

## Step 1

Enable the Organic Groups Services module: https://www.drupal.org/project/og_services

## Step 2

Go to `admin/structure/services/list/drupalgap/resources` and optionally enable the following resources based on your needs:

```
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
```

## Step 3

Flush all of Drupal's caches.

# DrupalGap Setup

## Step 1

Download the Organic Groups module for DrupalGap: https://github.com/signalpoint/og

## Step 2

Unzip the module so it lives here: `app/modules/og`

## Step 3

Add the module to the `app/settings.js` file:

```
Drupal.modules.contrib['og'] = {};
```
# Group Audience Field

You'll need to install the Entity Reference module for DrupalGap to be able to use Group Audience fields on your content type(s).

You *may* have to change the Group Audience field's widget to "Autocomplete", by default it is probably set as "OG reference".
