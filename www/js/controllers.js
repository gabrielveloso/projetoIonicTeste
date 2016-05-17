//ensinando a cadastrar um formulario de contatos
//https://www.youtube.com/watch?v=wkhClyW5uMc

angular.module('app.controllers', ['firebase', 'ngCordova'])


.service('fb', function(){    
    this.gerar = function(){
        return new Firebase("https://projetonovo.firebaseio.com");
    };        
})

//
.controller('cadastroCtrl',  function($scope, fb, $firebaseArray, $cordovaCamera) {
    
   // var fb = new Firebase("https://projetonovo.firebaseio.com"); 
    var ref = fb.gerar();
    
   $scope.register = function(username, password) {
        var fbAuth = $firebaseAuth(ref);
        fbAuth.$createUser({email: username, password: password}).then(function() {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            $location.path("/cadastro");
        }).catch(function(error) {
            console.error("ERROR " + error);
        });
    };	
   
   //$scope.usuario = $firebaseArray(ref);
    //var fbAuth = ref.getAuth();

    var usersRef = ref.child("usuarios");
   $scope.addUsuario = function(){       
       $scope.imagem = ($scope.imgURI !==null) ? $scope.imgURI : null;    
       console.log("adicionando contato");
      var usuarioRef =  usersRef.child($scope.email);
       usuarioRef.set(
           {email: $scope.email,
           senha: $scope.senha,
           apelido: $scope.apelido,
           descricao: $scope.descricao
        }, onComplete);
   };

   var onComplete = function(error) {
      if (error) {
        console.log('Synchronization failed');
      } else {
        console.log('Synchronization succeeded');
      }
  };

})

.controller('loginCtrl',  function($scope, fb,  $firebaseAuth, $location, $firebaseArray) {
    
    //var fb = new Firebase("https://projetonovo.firebaseio.com");
    
    $scope.login = function(username, password) {
        var fbAuth = $firebaseAuth(fb.gerar());
        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $location.path("/cadastro");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    };
 
})
   
.controller('configuracoesCtrl', function($scope) {

})
   
.controller('encontroCtrl', function($scope, fb, $firebaseArray) {    
    $scope.dados = $firebaseArray(fb.gerar());

     $scope.detalhar = function(perfil){
       $scope.email = perfil.email;
       $scope.teste = perfil.senha;
    };
    //$scope.dados.
})

.controller('perfilCtrl', function($scope) {
 

});
    