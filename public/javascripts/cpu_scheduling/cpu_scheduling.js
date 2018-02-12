var app=angular.module('cpu_scheduling',[]);
console.log("Hi there");
app.controller('test',['$scope','$http',function ($scope,$http){

    var bt=[];
    $scope.submit = function () {
      console.log("Sub");
      console.log($scope.p);
      angular.forEach($scope.p, function (value,index) {

         bt.push(value);
      });

        console.log(bt);
        $http.post('/process_scheduling',bt).then(function success(res) {
            console.log(res.data);
            $scope.query = res.data;
        }, function error(err) {
            console.log(err.data);
        });
    };
    console.log("Hi");
   /* $http({
        method:"GET",
        url : "/process_scheduling"
    }).then(function success(res) {
      console.log(res.data);
    }, function error(err) {
        console.log(err.data);
    })  ;*/
    /*var number_of_process = $scope.number;
    console.log(number_of_process)*/;
    $scope.choiceSet = {
        choices: []
    };
    $scope.quest = {};
    $scope.choiceSet.choices = [];
    $scope.addNewChoice = function() {
        $scope.choiceSet.choices.push('');
    };
    $scope.removeChoice = function(z) {
        $scope.choiceSet.choices.splice(z, 1);
    };
}]);