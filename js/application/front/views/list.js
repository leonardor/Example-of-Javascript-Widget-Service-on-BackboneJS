define([
	'jquery',
	'backbone',
	'underscore',
	'../helpers/url',
	'../collections/comments'], 
function($, Backbone, _, UrlHelper, CommentsCollection) {
	var ListComments = Backbone.View.extend({
		el: '#comments-list',
	    events: {
	    	'click a.prev': function(event) {
	    		this.pagination(event, 'previous');
	    	},
	        'click a.next': function(event) {
	        	this.pagination(event, 'next');
	        },
	        'click a.page': function(event) {
	        	this.pagination(event, 'gotopage');
	        }
	    },
	    initialize: function(options) {
	    	var self = this;
	    	
	    	options = options || {};
	    	
	    	_.bindAll(this, 'pagination', 'render');
	    	
	    	if($(this.el).length > 0) {
	    		var topicId = $(this.el).attr('data-topic-id')?$(this.el).attr('data-topic-id'):0;
	    		
		    	this.collection = new CommentsCollection({
		    		webservice: {
		    			method: App.config.list.webservice.method,
		    			action: App.config.list.webservice.action,
		    			accept: App.config.list.webservice.accept,
			    		params: {
			    			spam: App.config.list.webservice.params.spam,
			    			approved: App.config.list.webservice.params.approved,
			    			start: App.config.list.webservice.params.start,
			    			limit: App.config.list.webservice.params.limit,
			    			sort_field: App.config.list.webservice.params.sort_field,
			    			sort_order: App.config.list.webservice.params.sort_order,
			    			topic_id: topicId,
			    			comment_id: 0
			    		},
			    		cache: {
			    			enabled: App.config.list.webservice.cache.enabled,
			    			timeout: App.config.list.webservice.cache.timeout
			    		}
		    		},
		    		pagination: {
		    			page: App.config.list.pagination.page,
		    			per_page: App.config.list.pagination.per_page,
		    			show: App.config.list.pagination.show,
		    			style: App.config.list.pagination.style
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
		        this.collection.on('previouspage', this.render, this);
		        this.collection.on('nextpage', this.render, this);
		        this.collection.on('gotopage', this.render, this);
	    	}
	        
	        App.Front.Views.ListComments = this;
	        
	        return this;
	    },
	    render: function() {
	    	var self = this;
	    	
    		UrlHelper.loadCss(require.toUrl(App.config.list.theme.root + '/' + App.config.list.theme.name + '/theme.css'));
	    	
	    	var templates = [
	    	    'i18n!front/nls/' + App.config.list.template.language + '/language',
	    	    'text!' + App.config.list.template.root + '/' + App.config.list.template.name + '/pagination/' + this.collection.pagination.style + '.html',
	    		'text!' + App.config.list.template.root + '/' + App.config.list.template.name + '/list.html'
	    	];
	    	
	    	require(templates, function(Language, ListPaginationTemplate, ListCommentsTemplate) {
	    		var tmpl = _.template(ListPaginationTemplate);
			  	var pagination = tmpl({ collection: self.collection, lang: Language });				  	
			  	
	    		var tmpl = _.template(ListCommentsTemplate);
			  	var html = tmpl({ collection: self.collection, pagination: pagination, lang: Language });
			  	
			  	$(self.el).html(html);
	    	});

	        return this;
	    },
	    pagination: function(event, direction) {	
	    	if(direction == 'previous') {
	    		this.collection.previousPage();
	    	} else if(direction == 'next') {
	    		this.collection.nextPage();
	    	} else {
	    		var target = $(event.currentTarget);
	    		this.collection.gotoPage({ target: target });
	    	}
	    	
	        return false;
	    },
	    close:function () {
	        $(this.el).unbind();
	        $(this.el).empty();
	    }
	});
	
	return ListComments;
});