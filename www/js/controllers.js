//ensinando a cadastrar um formulario de contatos
//https://www.youtube.com/watch?v=wkhClyW5uMc

// resize camera
//https://forum.ionicframework.com/t/camera-image-resize-compression/13387

angular.module('app.controllers', ['firebase', 'ngCordova'])


.service('fb', function(){    
    this.ref = function(){
        return new Firebase("https://projetonovo.firebaseio.com");
    };        
})

//
.controller('cadastroCtrl',  function($scope, fb, $firebaseArray, $cordovaCamera) {
    
   // var fb = new Firebase("https://projetonovo.firebaseio.com"); 
    var ref = fb.ref();
    
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

  $scope.takePhoto = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  };

})

.controller('loginCtrl',  function($scope, fb,  $firebaseAuth, $location, $firebaseArray) {
    
    //var fb = new Firebase("https://projetonovo.firebaseio.com");
    
    $scope.login = function(username, password) {
        var fbAuth = $firebaseAuth(fb.ref());
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
    $scope.dados = $firebaseArray(fb.ref());

})

.controller('perfilCtrl', function($scope,fb, $firebaseArray, $stateParams) { 
    var userId = $stateParams.pessoa; 
    var dados = $firebaseArray(fb.ref());
    dados.$loaded().then(function(dados) {
        var pessoa = dados.$getRecord(userId);        
        $scope.email = pessoa.email;
        $scope.descricao = pessoa.descricao;
        $scope.senha = pessoa.senha;
        $scope.foto = pessoa.foto;
    }); 
    
});
    