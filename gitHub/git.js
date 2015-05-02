angular.module('gitHubApp.git', ['ngRoute']).controller('gitHubController',function($scope, $http){

    var gitSearchApi = 'https://api.github.com/search/repositories?q=';
    $scope.serachTerm = 'javascript';
    $scope.showControls = false;

    $scope.searchGit = function(event){
        if(event.keyCode == 13){
            $scope.showControls = true;
            $http.get(gitSearchApi + $scope.serachTerm).success(function(data){
                $scope.data = data.items;

                //Pagination
                $scope.currentPage = 1
                    ,$scope.numPerPage = 8
                    ,$scope.maxSize = 5;

                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;
                    $scope.filteredRepo = $scope.data.slice(begin, end);
                });
            });

            //Drop Down
            $scope.options = [
                {name:'Forks'},
                {name:'Stars'}
            ];
            $scope.selOption = $scope.options[0]; //Setting default value for drop down
            $scope.orderRepo = '-forks_count'; //Default - sorted by forks descending order
            $scope.sortRepo = function (val){
                $scope.orderRepo = (val.name === 'Forks') ? '-forks_count' : '-stargazers_count';
            };
        }
    };


});