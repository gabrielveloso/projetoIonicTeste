angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.cadastro', {
    url: '/cadastro',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cadastro.html',
        controller: 'cadastroCtrl'
      }
    }
  })
  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.configuracoes', {
    url: '/configuracao',
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuracoes.html',
        controller: 'configuracoesCtrl'
      }
    }
  })

  .state('menu.encontro', {
    url: '/encontro',
    views: {
      'side-menu21': {
        templateUrl: 'templates/encontro.html',
        controller: 'encontroCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/perfil/:pessoa',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })
  .state('menu.chat', {
    url: '/chat',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chat.html',
        controller: 'chatCtrl'
      }
    }
  })
  .state('menu.registrar', {
    url: '/registrar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/registrar.html',
        controller: 'registrarCtrl'
      }
    }
  })
  .state('menu.perdeu', {
    url: '/perdeu',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perdeusenha.html',
        controller: 'perdeuCtrl'
      }
    }
  })
  .state('menu.atualizar', {
    url: '/atualizar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/atualizarperfil.html',
        controller: 'atualizarCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  });

$urlRouterProvider.otherwise('/menu/cadastro');

  

});