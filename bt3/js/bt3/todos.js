/* global Bt3, bt3, $, Backbone, _ */
// An example Backbone application
// Load the application once the DOM is ready, using `jQuery.ready`:
// Create our global collection of **Todos**.
$(function () {
  // Structure Model
  // ----------
  bt3Todo = new Bt3.Models.Structure()
  bt3Todos = new Bt3.Collections.TodoList()
  bt3.structureView = new Bt3.Views.StructureView()

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $('#todoapp'),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'keypress #new-todo': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
      this.input = this.$('#new-todo')
      this.allCheckbox = this.$('#toggle-all')[0]

      this.listenTo(bt3Todos, 'add', this.addOne)
      this.listenTo(bt3Todos, 'reset', this.addAll)
      this.listenTo(bt3Todos, 'all', this.render)

      this.footer = this.$('footer')
      this.main = $('#main')

      bt3Todos.fetch()
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
      var done = bt3Todos.done().length
      var remaining = bt3Todos.remaining().length

      if (bt3Todos.length) {
        this.main.show()
        this.footer.show()
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}))
      } else {
        this.main.hide()
        this.footer.hide()
      }

      this.allCheckbox.checked = !remaining
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (bt3Todo) {
      var view = new Bt3.Views.StructureView({model: bt3Todo})
      this.$('#todo-list').append(view.render().el)
    },

    // Add all items in the **Todos** collection at once.
    addAll: function () {
      bt3Todos.each(this.addOne, this)
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function (e) {
      if (e.keyCode !== 13) return
      if (!this.input.val()) return
      bt3Todos.create({title: this.input.val()})
      this.input.val('')
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function () {
      _.invoke(bt3Todos.done(), 'destroy')
      return false
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked
      bt3Todos.each(function (todo) { todo.save({'done': done}) })
    }

  })

  // Finally, we kick things off by creating the **App**.
  var App = new AppView()
})
