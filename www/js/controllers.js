//ensinando a cadastrar um formulario de contatos
//https://www.youtube.com/watch?v=wkhClyW5uMc

// resize camera
//https://forum.ionicframework.com/t/camera-image-resize-compression/13387

//cordova camera
//https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/

//chat
//http://pt.stackoverflow.com/questions/30803/chat-javascript-n%C3%A3o-retorna-fun%C3%A7%C3%A3ob

//bug corrigido undefined
//http://www.yourtechchick.com/angularjs/ng-model-undefined-on-scope/

//ler
//http://stackoverflow.com/questions/14963776/get-users-by-name-property-using-firebase

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
            $location.path("/menu/encontro");
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
      //var usuarioRef =  usersRef.child($scope.email);
       usersRef.push(
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

.controller('chatCtrl', function($scope, fb, $firebaseArray) {    
    $scope.dados = $firebaseArray(fb.ref());

})
.controller('registrarCtrl', function($scope, fb, $firebaseAuth, $location, $firebaseArray) {  
    var auth = $firebaseAuth(fb.ref())
    $scope.registrar = function(username, password) {
      return auth.$createUser({email: username, password: password})
      .then(function(authData) {
          $scope.authData = authData;
            return auth.$authWithPassword({
                email: username,
                password: password
            }).then(function(authData) {
                $location.path("/menu/atualizar");
            })
        });
    }

})
.controller('atualizarCtrl', function($scope, fb, $firebaseAuth, $location, $firebaseArray) {    
    
    $scope.userdetails={};
    
    $scope.atualizarPerfil = function(){
        var auth = $firebaseAuth(fb.ref());
        var authData = auth.$getAuth();

        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
        }
        
        var teste = fb.ref().child('profile').orderByChild('email').equalTo('bira@gmail.com');
        $scope.dados = $firebaseArray(teste);
        
        var profileRef = $firebaseArray(fb.ref().child('profile'));
        var profile = {
            id: authData.uid,
            apelido: $scope.userdetails.nick,
            descricao: $scope.userdetails.desc,
            registered_in: Date()
          };
        return profileRef.set(profile).then(function(){
            $location.path("/menu/encontro");
        });
    }
    

})
.controller('perdeuCtrl', function($scope, fb, $firebaseArray) {    
    $scope.dados = $firebaseArray(fb.ref());

})


.controller('perfilCtrl', function($scope,fb, $firebaseArray, $stateParams, $location) { 
    var userId = $stateParams.pessoa; 
    var dados = $firebaseArray(fb.ref());
    dados.$loaded().then(function(dados) {
        var pessoa = dados.$getRecord(userId);        
        $scope.email = pessoa.email;
        $scope.descricao = pessoa.descricao;
        $scope.senha = pessoa.senha;
        $scope.foto = pessoa.foto;
    }); 
    
    $scope.abrirChat = function(){
        alert("testando o alerta");
        $location.path("/menu/chat");
    }

    
});
    