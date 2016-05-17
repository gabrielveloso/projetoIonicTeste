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
   
   $scope.usuario = $firebaseArray(ref);
    var fbAuth = ref.getAuth();
   $scope.addUsuario = function(){       
       $scope.imagem = ($scope.imgURI !==null) ? $scope.imgURI : null;    
       console.log("adicionando contato");
       $scope.usuario.$add(
           {email: $scope.email,
           senha: $scope.senha,
           apelido: $scope.apelido,
           descricao: $scope.descricao,
           foto: $scope.imagem
        }).then(function(){
           var id = ref.key();
           console.log("adicionado contato "+ fbAuth.uid);
           $scope.email = "";
           $scope.senha = "";
           $scope.apelido = "";
           $scope.descricao = "";
           $scope.foto = null;
       });
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
                consule.log(erro);
            });
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
})

.controller('perfilCtrl', function($scope) {

});
    