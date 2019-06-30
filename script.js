var app = angular.module('pomodoroApp', ['angular-svg-round-progressbar'])

 app.controller('pomodoroCtrl', function($scope,$timeout){
 
$scope.counterinit = 25;
$scope.breakinit = 5;
$scope.counter = $scope.counterinit*60;
$scope.break = $scope.breakinit*60;
$scope.session1 = true;

var stopped;
 
  $scope.reload = function(){
    
    var ci = $scope.counterinit;
    var bi = $scope.breakinit;
    $scope.session1 = true;
    $scope.break1 = false;
    $scope.counter = ci*60;
    $scope.break = bi*60;
    $timeout(function() {
        $scope.start();
    }, 1000);
  } 
 
  $scope.sessionplus = function() {
    $scope.counterinit = $scope.counterinit + 1;
    $scope.counter = $scope.counterinit * 60;
    $scope.stop();
  }
  
    $scope.sessionminus = function() {
      
      if($scope.counterinit == 1){}     
      
      else{
    $scope.counterinit = $scope.counterinit - 1;
    $scope.counter = $scope.counterinit * 60;
    $scope.stop();
      }
  }
    
     
  $scope.breakplus = function() {
    $scope.breakinit = $scope.breakinit + 1;
    $scope.break = $scope.breakinit * 60;
    $scope.stop();
  }
  
    $scope.breakminus = function() {
      
      if($scope.breakinit == 1){}
      
      else{
    $scope.breakinit = $scope.breakinit - 1;
    $scope.break = $scope.breakinit * 60;
    $scope.stop();
    }
  }
   
$scope.start = function() {
  $scope.stop1 = true;
  $scope.session1 = true;
  $scope.break1 = false;
    stopped = $timeout(function() {
      $scope.counter--;
      $scope.start();
      
      if($scope.counter == 0){
        var wav = 'http://themushroomkingdom.net/sounds/wav/smb/smb_pipe.wav';
        var audio = new Audio(wav);
			  audio.play();
        $scope.change();
        
        $timeout(function() {
        $scope.startbreak();
    }, 2000);
        
        
      }
  
    }, 1000);
  
  };
 
  $scope.startbreak = function() {
    
    $scope.break1 = true;
    $scope.session1 = false;
    $scope.stop1 = true;
    
    stopped = $timeout(function() {
      $scope.break--;
      $scope.startbreak();
      
      if($scope.break == 0){
        var wav = 'http://themushroomkingdom.net/sounds/wav/smb/smb_pipe.wav';
        var audio = new Audio(wav);
			  audio.play();
        $scope.change();
        $timeout(function() {
        $scope.reload();
    }, 2000);
        
      }
  
    }, 1000);
  
  };
   
   $scope.change = function(){
    $timeout.cancel(stopped);
 
    } 
   
  $scope.stop = function(){
    $scope.stop1 = false;
    $timeout.cancel(stopped);
 
    } 


 })

app.filter('secondsToDateTime', function() {
    return function(counter) {
        var d = new Date(0,0,0,0,0,0,0);
        d.setSeconds(counter);
        return d;
    };
})