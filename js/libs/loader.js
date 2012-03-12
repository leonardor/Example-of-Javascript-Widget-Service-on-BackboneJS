define(
	['/js/libs/jquery/jquery.min.js',
	 '/js/libs/underscore/underscore.min.js',
	 '/js/libs/backbone/backbone.min.js'],
function(){
	return {
		Backbone: Backbone.noConflict(),
		_: _.noConflict(),
		$: jQuery.noConflict()
	};
});