App.Front.Views.Index = Backbone.View.extend({
    events: {
        "submit form": "save"
    },
    initialize: function() {
    	 _.bindAll(this, 'render');
    	 
    	 this.model.bind('change', this.render);
    	 this.model.bind('add', this.add);
    	 this.model.bind('edit', this.edit);
    	 this.model.bind('list', this.list);
    	 this.model.bind('delete', this.delete);
    	 
    	 this.render();
    },
    add: function() {
    	var template = _.template($("#add-comment").html());
    	
    },
    edit: function(id) {
    	
    },
    delete: function(id) {
    	
    },
    update: function() {
        var self = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        
        this.model.save({ title: this.$('[name=title]').val(), body: this.$('[name=body]').val() }, {
            success: function(model, resp) {
                new App.Views.Notice({ message: msg });
                Backbone.history.saveLocation('documents/' + model.id);
            },
            error: function() {
                new App.Views.Error();
            }
        });
        
        return false;
    },
    render: function() {
    	$(this.el).html(JST.documents_collection({ collection: this.collection }));
        $(this.el).html(JST.document({ model: this.model }));
        $('#app').html(this.el);
        
        // use val to fill in title, for security reasons
        this.$('[name=title]').val(this.model.get('title'));
        
        this.delegateEvents();
    }
});