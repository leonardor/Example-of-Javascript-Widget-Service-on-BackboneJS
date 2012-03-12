define([
	'backbone', 
	'../controllers/index'], 
function(Backbone, IndexController){
	var Router = Backbone.Router.extend({
	    routes: {
	    	''				: 'index',
	    	'add'			: 'add',
	    	'edit/:id'		: 'edit',
	    	'delete/:id'	: 'delete',
	    	'view/:id'		: 'view'
	    },
	    initialize: function(options) {
	    	App.Front.Routers.Router = this;
	    	
		    return this;
	    },
	    index: function() {
    		new IndexController();
    	},
    	add: function() {
    		new IndexController();
    	},
    	edit: function(id) {
    		new IndexController({ id: id });
    	},
    	delete: function(id) {
    		new IndexController({ id: id });
    	},
    	view: function(id) {
	        new IndexController({ id: id });
    	}
	});
	
	return Router;
});