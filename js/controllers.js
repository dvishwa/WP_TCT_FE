'use strict';

/* Controllers */
var curationViewerControllers = angular.module('curationViewerControllers', []);

curationViewerControllers
 .controller('MainCtrl', ['$scope', '$http', '$filter', '$sce',
  function($scope, $http, $filter, $sce){
   var headlineImage = angular.element('.headline-image');
   $scope.articleParagraphs = [];
   $scope.articleImage = '';
   $scope.byline = '';

   $scope.getContent = function(){
    $http({
     method: 'GET',
     url: 'js/data/article1.json'
    }).
    success(function(data){
     $scope.article = data;
     $scope.getArticleData(data);
    }).
    error(function(data, status){
     console.log('error');
     console.log(data);
    });
   }();

  $scope.getArticleData = function(data){
   var articleData = {},
       articleItems = data.items;
   console.log('getArticleData data');
   console.log(data);
   angular.forEach(articleItems, function(value, key){
    if(articleItems[key].type === 'image'){ //Set the story's main image
     var articleImage  = articleItems[key].imageURL;
     if(typeof articleImage !== 'undefined'){
      headlineImage.css('background-image', 'url(' + articleImage +')');
     }
     else if(typeof articleImage === 'undefined' && typeof articleItems[key].uri !== 'undefined'){
      var articleImage = articleItems[key].uri;
      headlineImage.css('background-image', 'url(' + articleImage +')');
     }
    }
    else if(articleItems[key].subtype === 'paragraph'){ //Set the articles contents.
     $scope.articleParagraphs.push(articleItems[key].content);
    }
    else if(articleItems[key].type === 'byline'){
     $scope.byline  = articleItems[key].content;
    }
   });
  };
  $scope.to_trusted = function(html_code){ //Ensures that HTML is rendered rather than just displayed.
   return $sce.trustAsHtml(html_code);
  }
}]);