/*global Bt3, bt3, Backbone */
(function () {
  'use strict'
  // Stucture Model
  // ----------
  Bt3.Models.Structure = Backbone.Model.extend({
    defaults: function () {
      return {
        size: '0',
        title: '',
        // order: Todos.nextOrder(),
        // order: bt2.todos.nextOrder(),
        done: false,
        createdAt: new Date()
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function () {
      this.save({done: !this.get('done')})
    }
  })
}())
