var CategoriesView = Backbone.View.extend({
    template: Handlebars.compile('\
        <ul> \
        {{#each categories }} \
            <li>{{ this.name }} \
                <ul> \
                {{#each this.products }} \
                    <li>{{ this.name }}</li> \
                {{/each}} \
                </ul> \
            </li> \
        {{/each}} \
        </ul>'),

    initialize: function() {
        this.categories = new CategoryList();
        this.listenTo(this.categories, "sync", this.render, this);
        this.categories.fetch()
    },
    render: function() {
        var context = {
            categories: this.categories.toJSON()
        };
        this.$el.html(this.template(context));
    }
});