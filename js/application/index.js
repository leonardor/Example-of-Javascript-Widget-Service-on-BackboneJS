//This set's up the module paths for underscore and backbone
require.config({ 
    'paths': { 
    	'loader'	: '/js/libs/loader',
        'jquery'	: '/js/libs/jquery/jquery',
        'underscore': '/js/libs/underscore/underscore',
        'backbone'	: '/js/libs/backbone/backbone',
		'app'		: '/js/application/front/app'
	},
	'locale': 'root'
}); 

var App = {};

require([
	'app'], 
function(application){
	App = application;
	App.init();
});