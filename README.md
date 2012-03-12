Javascript Widget Service on BackboneJS
=======================================

Introduction
------------

This is an advanced example of a centralized javascript widget service on BackboneJS library
that also requires the jQuery, UnderscoreJS and RequireJS libraries, especially in order to
send data and process data to and from the webservice through the remote widgets installed on
client websites.

Usage
-----

The application is loaded only width one script line:

<script data-main="/js/application/index.js" src="/js/libs/require/require.min.js"></script>

An optional configuration file can be loaded to overwrite the default application data
(that is useful when you have multiple sites needing different setting like other css theme
or other html template and so on):

