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

&lt;script type="text/javascript" data-main="/js/application/index.js" src="/js/libs/require/require.min.js"&gt;&lt;/script&gt;

An optional custom configuration file can be loaded to overwrite the default application data
(that is useful when you have multiple sites needing different setting like other css theme
or other html template and so on):

&lt;script type="text/javascript" src="custom-config.js"&gt;&lt;/script&gt;

About the widget
----------------

This example is a applied centralized widget for listing and adding comments through a third-party webservice.

Supposing that every item on a website has a topic associted with it, the widgets we are building will be bound
accordingly to a topic. So, the frontend example widgets are:

a) a list of recommended comments by rating
b) a comment form
c) a list of comments with pagination

Every widget has a HTML5 attribute data-topic-id which is used to retrieve and send data to the webservice.
The HTML5 attribute data-id is used to index the html elements in combination with the data-topic-id because
one can put multiple widgets on a page and otherwise their normal id attributes will collide.

The REST webservice that process and serves the data (comments list) is not included. This cand be developed in any
given programming language one needs and the method would be bound to the Comment model (add) and the Comments collection (list).

What you can do with it
-----------------------

As a practical example of a BackboneJS application this code is free for use and modifications as you see fit.

Have fun!