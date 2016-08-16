/* global Bt3, Backbone, $ */
  Bt3.Routers.Router = Backbone.Router.extend({

  // Initialize application components.
  // The collection object comes first as views depend on it.
  initialize: function (el) {
    this.el = el
    this.itemView = new Bt3.Views.ContentView({template: '#item'})
    this.statsView = new Bt3.Views.ContentView({template: '#stats'})
    this.enterSizeView = new Bt3.Views.ContentView({template: '#enterSize'})
    this.enterDataView = new Bt3.Views.ContentView({template: '#enterData'})
    this.processView = new Bt3.Views.ContentView({template: '#process'})
    this.notFoundView = new Bt3.Views.ContentView({template: '#not-found'})
  },

  routes: {
    '': 'enterSize',
    'enterSize': 'enterSize',
    'enterData': 'enterData',
    'process': 'process',
    '*else': 'notFound'
  },

  currentView: null,

  switchView: function (view) {
    if (this.currentView) {
      // Detach the old view
      this.currentView.remove()
    }

    // Move the view element into the DOM (replacing the old content)
    this.el.html(view.el)

    // Render view after it is in the DOM (styles are applied)
    view.render()

    this.currentView = view
  },

  /*
   * Change the active element in the topbar
   */
  setActiveEntry: function (url) {
    // Unmark all entries
    $('li').removeClass('active')

  // Mark active entry
    $("li a[href='" + url + "']").parents('li').addClass('active')
  },

  enterSize: function () {
    this.switchView(this.enterSizeView)
    this.setActiveEntry('#enterSize')
  },

  enterData: function () {
    this.switchView(this.enterDataView)
    this.setActiveEntry('#enterData')
  },

  process: function () {
    this.switchView(this.processView)
    this.setActiveEntry('#process')
  },

  notFound: function () {
    this.switchView(this.notFoundView)
  }

})
