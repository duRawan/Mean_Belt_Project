'use strict';

    /*
    * @Author : Suraj Roy
    * @Date : 02 April 2016
    * @Source : jsonworld.com
    * @Topic : sending email using nodejs nodemailer module
    */
    
angular.module('sendmailApp', [])
.controller('MailController', function ($scope,$http) {
  $scope.loading = false;
  $scope.send = function (mail){
    $scope.loading = true;
    $http.post('/sendemail', {
      to: 'du_rawan@outlook.com',
      subject: 'Message from AngularCode',
      text: mail.message
    }).then(res=>{
        $scope.loading = false;
        $scope.serverMessage = 'Email sent successfully';
    });
  }
})
