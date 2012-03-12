define([
	'jquery',
	'backbone',
	'underscore',
	'../helpers/url',
	'../models/comment'], 
function($, Backbone, _, UrlHelper, CommentModel) {
	var AddComment = Backbone.View.extend({
		el: '#comments-add',
		events: {
			'change input': 'change',
		    'click input.add': 'add',
		    'click input.save': 'save'
		},
		initialize: function(options) {
			options = options || {};
			
			_.bindAll(this, 'save', 'render');
			
			App.Front.Views.AddComment = this;
			
			return this;
		},
		render: function() {
			var self = this;
			
			var templates = [
				'i18n!front/nls/' + App.config.add.template.language + '/language',
				'text!' + App.config.add.template.root + '/' + App.config.add.template.name + '/add.html'
			];
	
			require(templates, function(Language, AddCommentTemplate) {
				var topicId = $(self.el).attr('data-topic-id')?$(self.el).attr('data-topic-id'):0;

				var tmpl = _.template(AddCommentTemplate);
				var html = tmpl({ topic_id: topicId, name: '', email: '', title: '', message: '', lang: Language });
	
				$(self.el).html(html);	   
			});

			return this;
		},
		change:function (event) {
		    //var target = event.target;
		    //console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
		},
		save: function(event) {
			
		},
		add: function(event) {
			var self = this;
			
			this.model = new CommentModel();
		
			this.model.set(
				{
					'name'		: $('#form-comment').children('#name').val(),
					'email'		: $('#form-comment').children('#email').val(),
					'website'	: $('#form-comment').children('#website').val(),
					'title'		: $('#form-comment').children('#title').val(),
					'message'	: $('#form-comment').children('#message').val(),
					'url'		: $('#form-comment').children('#url').val(),
					'topic_id'	: $('#form-comment').children('#topic_id').val(),
					'site_id'	: $('#form-comment').children('#site_id').val()
				},
				{
					error: function(model, error) {
					    alert('eroare de validare');
					}
				}
			);
				
			if(this.model.isValid()) {
				if(this.model.isNew()) {
					this.model.save(
						this.model.get(),
						{
							data: {
								site_hash: 1
							},
							success: function(model, response) {
								model.trigger('save.success', model);
							},
							error: function(model, response) {
								alert('x');
								model.trigger('save.error', response);
							}
						}
					);
				} else {
					
				}
			}
		},
		close:function () {
			$(this.el).unbind();
			$(this.el).empty();
		}
	});
	
	return AddComment;
});