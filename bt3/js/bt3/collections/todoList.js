/*global Bt3, Backbone */
(function () {
  'use strict'
  // Todo List Collection
  // ----------------
  // Uses HTML `localStorage`.
  Bt3.Collections.TodoList = Backbone.Collection.extend({
    model: Bt3.Models.Structure,

    localStorage: new Backbone.LocalStorage(Bt3.Config.storeName),

    // Filter down the list of all todo items that are finished.
    done: function () {
      return this.where({done: true})
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
      return this.where({done: false})
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
      if (!this.length) return 1
      return this.last().get('order') + 1
    },

    // Todos are sorted by their original insertion order.
    comparator: 'order'
  })
}())
