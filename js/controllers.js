'use strict';

/* Controllers */
var curationViewerControllers = angular.module('curationViewerControllers', []);

curationViewerControllers
 .controller('MainCtrl', ['$scope', '$http', '$filter', '$sce', '$routeParams',
  function($scope, $http, $filter, $sce, $routeParams){
   var header = $('header'),
       headline = angular.element('.headline'),
       headlineImage = angular.element('.headline-image'),
       headlineImageHeader = angular.element('.headline-image header');
   $scope.articleParagraphs = [];
   $scope.articleImage = '';
   $scope.byline = '';
   $scope.title = '';

   $scope.$watch('headerHasImage', function(){
    if(typeof $scope.headerHasImage !== 'undefined' && !$scope.headerHasImage){ //If no image should be displayed, then set CSS styles to disregard an image.
     headline.removeClass('headline-image');
     headlineImageHeader.css('color', '#000'); //Header text.
    }
   });

   $scope.getContent = function(){
    $http({
     method: 'GET',
     url: 'js/data/article1.json'
    }).
    success(function(data, status, resp){
     $scope.article = data;
     $scope.getArticleData(data, status, resp);
    }).
    error(function(data, status){
     console.log('error');
     console.log(data);
    });
   }();

  $scope.getArticleData = function(data, status, resp){
   var articleData = {},
       articleItems = data.items,
       blurb = data.blurb,
       inlineCnt = 0;
   if(typeof $routeParams.resolution !== 'undefined'){ //set the breakpoint based on passed resolution.
    //alert($routeParams.resolution);
    //angular.element(body).css('background-image', 'url(' + articleImage +')');
   }
   $scope.title = data.title;
   console.log('getArticleData data');
   console.log(data);
   $scope.headerHasImage = false;
   angular.forEach(articleItems, function(value, key){
    console.log('articleItems[key]');
    console.log(articleItems[key]);
    if(articleItems[key].type === 'image'){ //Set the story's main image
     $scope.headerHasImage = true;
     var articleImage  = articleItems[key].imageURL;
     header.css('position', 'absolute');
     header.css('top', '');
     header.css('color', '#fff');
     if(typeof articleImage !== 'undefined'){
      headlineImage.css('background-image', 'url(' + articleImage +')');
     }
     else if(typeof articleImage === 'undefined' && typeof articleItems[key].uri !== 'undefined'){
      var articleImage = articleItems[key].uri;
      headlineImage.css('background-image', 'url(' + articleImage +')');
     }
    }
    else if(articleItems[key].subtype === 'paragraph'){ //Set the articles contents for all stories.
     $scope.articleParagraphs.push(articleItems[key].content);
    }
    else if(articleItems[key].type === 'inline_story'){ //Inline stories, push them along with the story paragraphs, including heading, image with URL.
     var inlineImage = '<a href="' + articleItems[key].url + '" target="_blank"><img src="' + articleItems[key].imageURL + '" /></a>';
     inlineCnt++;
     var inlineStory = '<section id="inline-story"' + inlineCnt + '"></section>';
     $scope.articleParagraphs.push(inlineStory + '<h2>Inline Story</h2>' + inlineImage + '<h3>' + articleItems[key].headline + '</h3></section');
     /*inlineStory.appendTo('body');
     var inlineElm = angular.element('#inline-story' + inlineCnt);
     console.log('inlineElm');
     console.log(inlineElm);
     console.log('inlineCnt: ' + inlineCnt);*/
     $('</section>', {
    	    id: 'inline-story' + inlineCnt,
    	    html: 'TEST'
    	}).appendTo("body");
     
     //angular.element('#inline-story' + inlineCnt).innerHTML = "sdsdfsfdfsfsdfdsdfssdfsdf sdfsdfsdfdfssdsdf sdfsdfsdfsdfsdfsd";
     console.log(angular.element("#inline-story1"));
     console.log('resp');
     console.log(resp());
    }
    else if(articleItems[key].type === 'byline'){ //Byline for all stories.
     $scope.byline  = articleItems[key].content;
    }
   });
   if(blurb == null || blurb.length <= -1){ //If there is no blurb, adjust headline height to remove it's space.
    $scope.hasBlurb = true;
    header.css('bottom', '2%');
   }
  };
  $scope.to_trusted = function(html_code){ //Ensures that HTML is rendered rather than just displayed.
   return $sce.trustAsHtml(html_code);
  }
}]);