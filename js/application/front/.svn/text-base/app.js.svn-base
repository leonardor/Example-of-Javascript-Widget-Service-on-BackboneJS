//This is the main entry point for the App
define([
	'backbone',
	'i18n!front/nls/language',
	'front/routers/router'],
function(Backbone, Language, Router) {
	var App = {
		Front: {
			Controllers: {},
			Views: {},
			Routers: {},
			Collections: {},
			Models: {}
		},
		el: '#app',
		site_hash: (CommentsSettings.site_hash || ''),
		user_hash: (CommentsSettings.user_hash || ''),
		config: {
			add: {
				webservice		: {
					method		: (CommentsSettings.add.webservice.method)?(CommentsSettings.add.webservice.method || 'POST'):'POST',
					action		: (CommentsSettings.add.webservice.action)?(CommentsSettings.add.webservice.action || 'add'):'add',
					params: {
						approved: (CommentsSettings.add.webservice.params.approved)?(CommentsSettings.add.webservice.params.approved || 0):0,
					}
				},
				theme: {
					name		: (CommentsSettings.add.theme.name)?(CommentsSettings.add.theme.name || 'default'):'default',
					root		: (CommentsSettings.add.theme.root)?(CommentsSettings.add.theme.root || '/js/application/front/themes'):'/js/application/front/themes'
				},
				template: {
					name		: (CommentsSettings.add.template.name)?(CommentsSettings.add.template.name || 'default'):'default',
					root		: (CommentsSettings.add.template.root)?(CommentsSettings.add.template.root || '/js/application/front/templates'):'/js/application/front/templates',
					language	: (CommentsSettings.add.template.language)?(CommentsSettings.add.template.language || 'root'):'root'
				},
				pagination: {
					show		: false
				}
			},
			recommended: {
				webservice		: {
					method		: (CommentsSettings.recommended.webservice.method)?(CommentsSettings.recommended.webservice.method || 'POST'):'POST',
					action		: (CommentsSettings.recommended.webservice.action)?(CommentsSettings.recommended.webservice.action || 'most_rated'):'most_rated',
					params: {
						spam	: (CommentsSettings.recommended.webservice.params.spam)?(CommentsSettings.recommended.webservice.params.spam || 0):0,
						approved: (CommentsSettings.recommended.webservice.params.approved)?(CommentsSettings.recommended.webservice.params.approved || 1):1,
						start	: (CommentsSettings.recommended.webservice.params.start)?(CommentsSettings.recommended.webservice.params.start || 0):0,
						limit	: (CommentsSettings.recommended.webservice.params.limit)?(CommentsSettings.recommended.webservice.params.limit || 3):3
					},
					cache		: {
						enabled	: (CommentsSettings.recommended.webservice.cache.enabled)?(CommentsSettings.recommended.webservice.cache.enabled || false):false,
						timeout	: (CommentsSettings.recommended.webservice.cache.timeout)?(CommentsSettings.recommended.webservice.cache.timeout || 3600):3600
					}
				},
				theme: {
					name		: (CommentsSettings.recommended.theme.name)?(CommentsSettings.recommended.theme.name || 'default'):'default',
					root		: (CommentsSettings.recommended.theme.root)?(CommentsSettings.recommended.theme.root || '/js/application/front/themes'):'/js/application/front/themes'
				},
				template: {
					name		: (CommentsSettings.recommended.template.name)?(CommentsSettings.recommended.template.name || 'default'):'default',
					root		: (CommentsSettings.recommended.template.root)?(CommentsSettings.recommended.template.root || '/js/application/front/templates'):'/js/application/front/templates',
					language	: (CommentsSettings.recommended.template.language)?(CommentsSettings.recommended.template.language || 'root'):'root'
				},
				pagination: {
					show		: false
				}
			},
			list: {
				webservice: {
					method		: (CommentsSettings.list.webservice.method)?(CommentsSettings.list.webservice.method || 'POST'):'POST',
					action		: (CommentsSettings.list.webservice.action)?(CommentsSettings.list.webservice.action || ''):'',
					params: {
						spam	: (CommentsSettings.list.webservice.params.spam)?(CommentsSettings.list.webservice.params.spam || 0):0,
						approved: (CommentsSettings.list.webservice.params.approved)?(CommentsSettings.list.webservice.params.approved || 1):1,
						start	: (CommentsSettings.list.webservice.params.start)?(CommentsSettings.list.webservice.params.start || 0):0,
						limit	: (CommentsSettings.list.webservice.params.limit)?(CommentsSettings.list.webservice.params.limit || 3):3,
						sort_field: (CommentsSettings.list.webservice.params.sort_field)?(CommentsSettings.list.webservice.params.sort_field || 'date'):'date',
						sort_order: (CommentsSettings.list.webservice.params.sort_order)?(CommentsSettings.list.webservice.params.sort_order || 'DESC'):'DESC'
					},
					cache		: {
						enabled	: (CommentsSettings.list.webservice.cache.enabled)?(CommentsSettings.list.webservice.cache.enabled || false):false,
						timeout	: (CommentsSettings.list.webservice.cache.timeout)?(CommentsSettings.list.webservice.cache.timeout || 3600):3600
					}
				},
				theme: {
					name		: (CommentsSettings.list.theme.name)?(CommentsSettings.list.theme.name || 'default'):'default',
					root		: (CommentsSettings.list.theme.root)?(CommentsSettings.list.theme.root || '/js/application/front/themes'):'/js/application/front/themes'
				},
				template: {
					name		: (CommentsSettings.list.template.name)?(CommentsSettings.list.template.name || 'default'):'default',
					root		: (CommentsSettings.list.template.root)?(CommentsSettings.list.template.root || '/js/application/front/templates'):'/js/application/front/templates',
					language	: (CommentsSettings.list.template.language)?(CommentsSettings.list.template.language || 'root'):'root'
				},
				pagination		: {
					show		: (CommentsSettings.list.pagination)?(CommentsSettings.list.pagination.show || true):true,
					page		: (CommentsSettings.list.pagination)?(CommentsSettings.list.pagination.page || 1):1,
					style		: (CommentsSettings.list.pagination)?(CommentsSettings.list.pagination.style || 'range'):'range'
				}
			}
		},
	    init: function() {
	    	this.router = new Router();
	    
	    	this.lang = Language;
	    	
	    	Backbone.emulateJSON = true;
	    	Backbone.emulateHTTP = true;
	        Backbone.history.start();
	    }
	};

	return App;
});