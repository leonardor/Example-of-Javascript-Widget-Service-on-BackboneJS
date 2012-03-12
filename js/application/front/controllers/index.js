define([
    'jquery',
	'backbone',
	'../views/add',
	'../views/list',
	'../views/recommended'], 
function($, Backbone, AddCommentView, ListCommentsView, RecommendedCommentsView) {
	var Index = Backbone.Router.extend({
		el: '#comments',
	    initialize: function (options) {
	    	var self = this;
	    	
	    	App.router.on("route:index", function() {
	    		self.index();
	    	});
	    	App.router.on("route:add", function() {
	    		self.add();
	    	});
	    	App.router.on("route:edit", function(id) {
	    		self.edit(id);
	    	});
	    	
	    	App.Front.Controllers.Index = this;
	    	
	    	return this;
	    },
	    elements: {
	    	recommended: {},
	    	add: {},
	    	list: {}
	    },
	    index: function () {
	    	alert('index');
	    	var self = this;

	    	$(this.el).children('div[data-id="comments-recommended"]').each(function() {
	    		var obj = $(this);
	    		var topicId = obj.attr('data-topic-id');
	    		
	    		if(self.elements.recommended[topicId]) self.elements.recommended[topicId].close();
	    		
	    		self.elements.recommended[topicId] = new RecommendedCommentsView({ el: obj });
	    		self.elements.recommended[topicId].render();
	    	});
	    	
	    	$(this.el).children('div[data-id="comments-list"]').each(function() {
	    		var obj = $(this);
	    		var topicId = obj.attr('data-topic-id');
	    		
	    		if(self.elements.list[topicId]) self.elements.list[topicId].close();
	    		
		        self.elements.list[topicId] = new ListCommentsView({ el: obj });
		        
		        self.elements.list[topicId].on('data', function() {
		        	this.render();
		        }, self.elements.list[topicId]);
	    	});
	        	
	    	$(this.el).children('div[data-id="comments-add"]').each(function() {
	    		var obj = $(this);
	    		var topicId = obj.attr('data-topic-id');
	    		
		        if(self.elements.add[topicId]) self.elements.add[topicId].close();
		        
		        self.elements.add[topicId] = new AddCommentView({ el: obj });	
		        self.elements.add[topicId].render();
		        
		        self.elements.add[topicId].on('add', function() {
		        	this.collection.refresh();
		        }, self.elements.add[topicId]);
	    	});
	    },
	    add: function () {
	    	alert('add comment');
	
	    	new AddCommentView({});
	    },
	    edit: function (id) {
	    	alert('edit comment ' + id);
	    },
	    delete: function (id) {
	    	alert('delete comment ' + id);
	    },
	    view: function (id) {
	    	alert('view comment ' + id);
	    }
	});

	return Index;
});