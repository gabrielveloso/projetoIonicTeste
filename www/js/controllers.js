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
            $location.path("/menu/atualizar");
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

.controller('chatCtrl', function($scope, fb, $firebaseArray, $firebaseAuth, $firebaseObject,$rootScope) {    
    var auth = $firebaseAuth(fb.ref());
    var authData = auth.$getAuth();    
    var chaveUsuario = authData.uid;       
    var profileRef = fb.ref().child('profile').child(chaveUsuario).child("mensagens");
    $scope.mensagens = $firebaseArray(profileRef);
   
    $rootScope.index = 0;

    $scope.salvarMensagem = function(chat){
        var auth = $firebaseAuth(fb.ref());
        var authData = auth.$getAuth();

        var msg = {
          conteudo: chat.mensagem
        };

        fb.ref().child('profile').child(chaveUsuario).child("mensagens").child($rootScope.index++).set(msg);       
    }

})
.controller('registrarCtrl', function($scope, fb, $firebaseAuth, $location, $firebaseArray) {  
    var auth = $firebaseAuth(fb.ref());
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
.controller('atualizarCtrl', function($scope, fb, $firebaseAuth, $location, $firebaseArray,$firebaseObject) {    
    
    $scope.userdetails={};
    var auth = $firebaseAuth(fb.ref());
    var authData = auth.$getAuth();
    var chaveUsuario = authData.uid;    
    var profileRef = fb.ref().child('profile').child(chaveUsuario);
    $scope.userdetails = $firebaseObject(profileRef);
    console.log($scope.userdetails.apelido);
    console.log($scope.userdetails);

    var onComplete = function(error) {
      if (error) {
        console.log('Synchronization failed');
      } else {
        console.log('Synchronization succeeded');
        $location.path("/menu/encontro");
      }
    };

    
    $scope.atualizarPerfil = function(){
        var auth = $firebaseAuth(fb.ref());
        var authData = auth.$getAuth();

        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
        }
        
        //var teste = fb.ref().child('profile').orderByChild('email').equalTo('bira@gmail.com');
        //$scope.dados = $firebaseArray(teste);

        var profile = {
            id: authData.uid,
            apelido: $scope.userdetails.apelido,
            descricao: $scope.userdetails.descricao,
            registered_in: Date()
          };

        fb.ref().child('profile').child(authData.uid).set(profile, onComplete);
        /*var profileRef = $firebaseArray(fb.ref().child('profile'));
        var profile = {
            id: authData.uid,
            apelido: $scope.userdetails.apelido,
            descricao: $scope.userdetails.descricao,
            registered_in: Date()
          };
        return profileRef.$push(profile).then(function(){
            $location.path("/menu/encontro");
        });*/
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
    