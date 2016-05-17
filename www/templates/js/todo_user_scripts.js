/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #fechar */
    $(document).on("click", "#fechar", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
