define([
	'jquery',
	'backbone',
	'underscore',
	'../helpers/url',
	'../collections/comments'], 
function($, Backbone, _, UrlHelper, CommentsCollection) {
	var RecommendedComments = Backbone.View.extend({
		el: '#comments-recommended',
	    initialize: function(options) {
	    	var self = this;

	    	options = options || {};
	    	
	    	_.bindAll(this, 'render');
	    	
	    	if($(this.el).length > 0) {
	    		var topicId = $(this.el).attr('data-topic-id')?$(this.el).attr('data-topic-id'):0;
	    		
		    	this.collection = new CommentsCollection({
		    		webservice: {
		    			method: App.config.recommended.webservice.method,
		    			action: App.config.recommended.webservice.action,
		    			accept: App.config.recommended.webservice.accept,
			    		params: {
			    			spam: App.config.recommended.webservice.params.spam,
			    			approved: App.config.recommended.webservice.params.approved,
			    			start: App.config.recommended.webservice.params.start,
			    			limit: App.config.recommended.webservice.params.limit,
			    			topic_id: topicId,
			    			comment_id: 0
			    		},
			    		cache: {
			    			enabled: App.config.recommended.webservice.cache.enabled,
			    			timeout: App.config.recommended.webservice.cache.timeout
			    		}
		    		},
		    		pagination: {
		    			show: false
		    		}
		    	});
		
		        this.collection.fetch({
		        	success: function(response) {
		        		self.trigger('data');
		        	},
		        	error: function(response) {
		        		new Error({ message: "Error loading comments." });
		        	}
		        });
		        
		        this.collection.on('refresh', this.render, this);
	    	}
	        
	        App.Front.Views.RecommendedComments = this;
	        
	        return this;
	    },
	    render: function() {
	    	var self = this;
	    	
    		UrlHelper.loadCss(require.toUrl(App.config.recommended.theme.root + '/' + App.config.recommended.theme.name + '/theme.css'));
	    	
	    	var templates = [
	    	    'i18n!front/nls/' + App.config.recommended.template.language + '/language',
	    		'text!' + App.config.recommended.template.root + '/' + App.config.recommended.template.name + '/recommended.html'
	    	];
	    	
	    	require(templates, function(Language, RecommendedCommentsTemplate) {
	    		var tmpl = _.template(RecommendedCommentsTemplate);
			  	var html = tmpl({ collection: self.collection, lang: Language });
			  	
			  	$(self.el).html(html);
	    	});
		  
	        return this;
	    },
	    close:function () {
	        $(this.el).unbind();
	        $(this.el).empty();
	    }
	});
	
	return RecommendedComments;
});