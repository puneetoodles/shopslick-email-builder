angular.module('email').controller('createEmailCtrl', ['$scope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location', '$routeParams',
        function ($scope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location,$routeParams) {

                $scope.editMode = false;

                $scope.replyMode = false;
                $scope.forwardMode = false;
              
               
                var ciResponseText = document.getElementById('ciResponseText');
                $scope.editId = $routeParams.emailID;

                if($scope.editId){
                        $scope.emails = JSON.parse(localStorage.getItem('cEmail'));
                        angular.forEach($scope.emails, function(email){
                                if($scope.editId == email.id){
                                    $scope.compose = email;
                                    $scope.editMode = true;

                                    ciResponseText.innerHTML = email.body;
                                }
                            });
                       
                }else{

                        $scope.compose = {
                                ccTags: '',
                                bccTags: '',
                                body: ''
                        }

                }

                $scope.reply = function(){
                        $scope.replyMode = true; 
                }

                $scope.forward = function(){
                        $scope.forwardMode = false;    
                }
                
                $scope.getExistData = [];

                $scope.emailTemplates = JSON.parse(localStorage.getItem('Email'));


                $scope.chooseEmail = function (currentTemplate) {

                        ciResponseText.innerHTML = '';
                        angular.forEach($scope.emailTemplates, function (email) {
                                if (currentTemplate == email.id) {
                                        var templateData = JSON.stringify(email.html);
                                        var templateData2 = JSON.parse(templateData);
                                        var template = templateData2.replace(/\\n/g, '').replace(/\\"/g, '').replace(" ", "");
                                        $scope.compose.body = email.html;
                                        ciResponseText.innerHTML = email.html;

                                }

                        });

                }


                $scope.submitCompose = function (data) {
                        data.read = false;
                        data.dateCreated = new Date();
                        data.selected = false;
                        var timeStamp = new Date(new Date()).getTime();
                        data.id = "email"+timeStamp;
                        if (localStorage.getItem("cEmail") != null) {
                                var getData = JSON.parse(localStorage.getItem('cEmail'));
                                $scope.getExistData = getData;
                        }
                        $scope.getExistData.push(data);

                        localStorage.setItem('cEmail', JSON.stringify($scope.getExistData))
                        $scope.compose = {};
                        $scope.composeForm.$setPristine();
                        ciResponseText.innerHTML = '';

                }


                $scope.replySubmit = function(item, index){
                        var getData = JSON.parse(localStorage.getItem('cEmail'));
                                $scope.getExistData = getData;
                        var index = $scope.getExistData.indexOf(item);
                        item.read = true;
                        $scope.getExistData.splice(index,1,item);  
                        localStorage.setItem('cEmail', JSON.stringify($scope.getExistData));
                }




        }
]);