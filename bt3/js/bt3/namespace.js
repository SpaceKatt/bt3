
// Set up global application namespace using object literals.
//
// Class names.
//
// Lazily creates:
//
//    Bt3: {
//      Config: {},
//      Models: {},
//      Collections: {},
//      Routers: {},
//      Views: {},
//      Templates: {},
//      MathLib: {}
//    }
//
var Bt3 = Bt3 || {}
Bt3.Config || (Bt3.Config = {})
Bt3.Models || (Bt3.Models = {})
Bt3.Collections || (Bt3.Collections = {})
Bt3.Routers || (Bt3.Routers = {})
Bt3.Views || (Bt3.Views = {})
Bt3.Templates || (Bt3.Templates = {})
Bt3.MathLib || (Bt3.MathLib = {})

// Application instance.
var bt3 = bt3 || {}
