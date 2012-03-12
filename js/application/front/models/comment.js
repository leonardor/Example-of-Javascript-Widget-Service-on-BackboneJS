define([
	'jquery',
	'backbone',
	'underscore'], 
function($, Backbone, _) {
	var Comment = Backbone.Model.extend({
		urlRoot: '/comments',
		defaults: {
			'id': null,
			'name': 'bubu',
			'email': '',
			'website': '',
			'title': '',
			'message': '',
			'spam': 0,
			'akismet': 0,
			'date': '0000-00-00 00:00:00',
			'update': '0000-00-00 00:00:00',
			'topic_id': 0,
			'site_id': 0,
			'appreciation': 0,
			'remote_ip': '0.0.0.0',
			'forwarded_ip': '0.0.0.0',
			'approved': 0,
			'report': 0,
			'plus_rating': 0,
			'minus_rating': 0,
			'url': ''
		},
		initialize: function(attributes, options) {
			options = options || {};
			
			this.bind('save.success', function(model) {
	            console.log('save.success()', model);
	        });
			
			this.bind('save.error', function(response) {
				if(response.status == 404) {
					alert('A aparut o eroare de server (' + response.status + ').');
				} else if(response.status == 500) {
					alert('A aparut o eroare de server (' + response.status + ').');
				}
	        });
	    	
	    	this.bind('create', function(model) {
	            console.log('create()', model);
	        });
	
			this.bind('sync', function(model) {
	            console.log('sync()', model);
	        });
			
	        this.bind('remove', function(model) {
	            console.log('remove()', model);
	        });
	        
	        this.bind('update', function(model) {
	            console.log('update()', model);
	        });
	        
			this.bind('error', function(model, error) {
				console.log('error()', model);
				 
				if (_.isArray(error)) {
			      this.errors = error.join('<br/>');
			    } else {
			      // Server error; parse as needed into a displayable error.
			    }
			});
			
			this.on('change', function(model) {
				if (model.hasChanged()) {
					alert('Modelul a fost salvat');
				}
			});
			
			App.Front.Models.Comment = this;
			
			return this;
		},
		methodToURL: {
		    'read'	: '/comments/' + this.id,
		    'create': '/comments/add',
		    'update': '/comments/update/' + this.id,
		    'delete': '/comments/delete/' + this.id
		},
		sync: function(method, model, options) {
			options = options || {};
			
			options.url = this.methodToURL[method.toLowerCase()];
			
			options.data = _.extend(model.attributes, options.data);
	
		    Backbone.sync(method, model, options);
		},
	    validate: function(attrs) {
	    	var errors = {};
	    	
	    	if(_.isEmpty(attrs.name)) {
	    		errors.name = 'is required';
	    	}
	 
	    	if(_.isEmpty(attrs.title)) {
	    		errors.title = 'is required';
	    	}
	    	
	    	return _.any(errors)? errors : null;;
	    }
	});
	
	return Comment;
});