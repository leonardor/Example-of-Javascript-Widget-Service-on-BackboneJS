define([
	'underscore',
	'backbone',
	'../models/comment'], 
function(_, Backbone, CommentModel) {
	var Comments = Backbone.Collection.extend({
		model: CommentModel,
		initialize: function(options) {
			options = options || {};
			
			this.webservice = { params: {}, cache: {}, method: 'POST', action: '', accept: 'text/json' };
			
				this.webservice.method = options.webservice.method || this.webservice.method;
				this.webservice.action = options.webservice.action || this.webservice.action;
				this.webservice.accept = options.webservice.accept || this.webservice.accept;
			
				this.webservice.params = { spam: 0, approved: 1, start: 0, limit: 10, sort_field: 'date', sort_order: 'DESC'};
			
					this.webservice.params.spam = options.webservice.params.spam || this.webservice.params.spam;
					this.webservice.params.approved = options.webservice.params.approved || this.webservice.params.approved;
					this.webservice.params.start = options.webservice.params.start || this.webservice.params.start;
					this.webservice.params.limit = options.webservice.params.limit || this.webservice.params.limit;
					this.webservice.params.sort_field = options.webservice.params.sort_field || this.webservice.params.sort_field;
					this.webservice.params.sort_order = options.webservice.params.sort_order || this.webservice.params.sort_order;
			
					this.webservice.params.topic_id = options.webservice.params.topic_id || 0;
					this.webservice.params.comment_id = options.webservice.params.comment_id || 0;
					
				this.webservice.cache = { enabled: false, timeout: 3600 };
			
					this.webservice.cache.enabled = options.webservice.cache.enabled || this.webservice.cache.enabled;
					this.webservice.cache.timeout = options.webservice.cache.timeout || this.webservice.cache.timeout;
			
			this.pagination = { show: true, style: 'range', page: 1, perPage: 10, total: 0, pages: 1, next: false, prev: false };
			
				this.pagination.show = options.pagination.show || this.pagination.show;
				this.pagination.page = options.pagination.page || this.pagination.page;
				this.pagination.perPage = this.webservice.params.limit;
				this.pagination.style = options.pagination.style || this.pagination.style;

			App.Front.Collections.Comments = this;

			return this;
		},
		url: '/comments',
		fetch: function(options) {
			options = options || {};
			
			options.dataType = options.dataType || (this.webservice.accept == 'text/json')?'json':((this.webservice.accept == 'text/xml')?'xml':'xml');
			options.type = options.type || this.webservice.method;
			options.data = options.data || this.webservice;
			options.url = this.url + '/' + this.webservice.action;
	
			this.reset();
			
			return Backbone.Collection.prototype.fetch.call(this, options);
		},
	    parse: function(response) {
	        this.pagination.total = response.total;
	        
	        this.pagination.totalPages = (this.pagination.perPage > 0)?Math.ceil(this.pagination.total / this.pagination.perPage):1;
	       	this.pageInfo();
	        return response.items;
		},
		pageInfo: function() {
		    var max = Math.min(this.pagination.total, this.pagination.page * this.pagination.perPage);
	
		    if (this.pagination.total == this.pagination.totalPages * this.pagination.perPage) {
		      max = this.pagination.total;
		    }
	
		    this.pagination.range = [(this.pagination.page - 1) * this.pagination.perPage + 1, max];
		    
		    this.pagination.pages = _.range(1, this.pagination.totalPages + 1);
	
		    if (this.pagination.page > 1) {
		    	this.pagination.prev = this.pagination.page - 1;
		    } else {
		    	this.pagination.prev = false;
		    }
	
		    if (this.pagination.page < this.pagination.totalPages) {
		    	this.pagination.next = this.pagination.page + 1;
		    } else {
		    	this.pagination.next = false;
		    }
		},
		gotoPage: function(options) {
			options = options || {};
			
			options.target = options.target || null;
			
			var self = this;
			
			this.pagination.page = (options.target)?options.target.attr('title'):1;
			
		    if (this.pagination.page < 1) {
		      return false;
		    } else if(this.pagination.page > this.pagination.totalPages) {
		    	return false;
		    }
		
		    options.success = function(response) {
		    	self.trigger('gotopage');
		    }
	
		    return this.fetch(options);
		},
		nextPage: function(options) {
			options = options || {};
			
			var self = this;
			
		    if (!this.pagination.next) {
		      return false;
		    }
		    
		    this.pagination.page = parseInt(this.pagination.page) + 1;
		    
		    options.success = function(response) {
		    	self.trigger('previouspage');
		    }
	
		    return this.fetch(options);
		},
		previousPage: function(options) {
			options = options || {};
			
			var self = this;
			
			if (!this.pagination.prev) {
		      return false;
		    }
			
		    this.pagination.page = parseInt(this.pagination.page) - 1;
		    
		    options.success = function(response) {
		    	self.trigger('nextpage');
		    }
		    
		    return this.fetch(options);
		},
		refresh: function(options) {
			options = options || {};
			
			var self = this;
			
			this.pagination.page = 1;
			
			options.success = function(response) {
		    	self.trigger('refresh');
		    }
			
			return this.fetch(options);
		}
	});
	
	return Comments;
});