 /**
     * Custom directive to emulate Material Design for inputs
     * @example: <input type="text" md-input />
     */
    angular.module('email').directive('mdInput', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                // scope: {
                //     ngModel: '='
                // },
                controller: function ($scope, $element) {
                    var $elem = $($element);
                    $scope.updateInput = function () {
                        // clear wrapper classes
                        $elem.closest('.md-input-wrapper').removeClass('md-input-wrapper-danger md-input-wrapper-success md-input-wrapper-disabled');

                        if ($elem.hasClass('md-input-danger')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-danger');
                        }
                        if ($elem.hasClass('md-input-success')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-success');
                        }
                        if ($elem.prop('disabled')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-disabled');
                        }
                        if ($elem.hasClass('label-fixed')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-filled');
                        }
                        if ($elem.val() !== '') {
                            $elem.closest('.md-input-wrapper').addClass('md-input-filled');
                        }
                    };
                },
                link: function (scope, elem, attrs) {

                    var $elem = $(elem);

                    $timeout(function () {
                        if (!$elem.hasClass('md-input-processed')) {

                            if ($elem.prev('label').length) {
                                $elem.prev('label').addBack().wrapAll('<div class="md-input-wrapper"/>');
                            } else {
                                $elem.wrap('<div class="md-input-wrapper"/>');
                            }
                            $elem
                                .addClass('md-input-processed')
                                .closest('.md-input-wrapper')
                                .append('<span class="md-input-bar"/>');
                        }

                        scope.updateInput();

                    }, 100);

                    scope.$watch(function () {
                        return $elem.attr('class');
                    },
                        function (newValue, oldValue) {
                            if (newValue != oldValue) {
                                scope.updateInput();
                            }
                        }
                    );

                    scope.$watch(function () {
                        return $elem.val();
                    },
                        function (newValue, oldValue) {
                            if (!$elem.is(':focus') && (newValue != oldValue)) {
                                scope.updateInput();
                            }
                        }
                    );

                    $elem
                        .on('focus', function () {
                            $elem.closest('.md-input-wrapper').addClass('md-input-focus');
                        })
                        .on('blur', function () {
                            $timeout(function () {
                                $elem.closest('.md-input-wrapper').removeClass('md-input-focus');
                                if ($elem.val() === '') {
                                    $elem.closest('.md-input-wrapper').removeClass('md-input-filled');
                                } else {
                                    $elem.closest('.md-input-wrapper').addClass('md-input-filled');
                                }
                            }, 100);
                        });
                }
            };
        }
    ])
    /**
     * Custom directive to upload images
     * @example: <input type="file" input-file-upload />
     */
    .directive('inputFileUpload', [
        'utils',
        'variables',
        '$timeout',
        function (utils, variables, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    element: '=',
                    model: '='
                },
                template: `
                    <div>
                        <div class="upload">
                            <div class="current-image">
                                <img ng-src="{{thumb || model}}" alt="" />
                            </div>
                            <div class="upload-image">
                                <p>Upload an image</p>
                                <a onclick="return false" href="#">Browse</a>
                            </div>
                            <div class="uploading">
                                <i class="material-icons icon-spin">hdr_strong</i>
                            </div>
                        </div>
                        <input type="text" class="md-input" ng-model="model" />
                    </div>
                `,
                link: (scope, elem, attrs) => {

                    let uploadLink = $(elem).find('.upload-image a');
                    let uploadingIcon = $(elem).find('.uploading')

                    let uploadInput = $('<input/>', {
                        type: 'file',
                        name: 'file'
                    }).on('change', function (event) {

                        if (!variables.urlToUploadImage)
                            throw Error('You don\'t set the \'urlToUploadImage\' in variables.');

                        var inputFile = $(event.target)
                        inputFile.prop('disabled', true);
                        uploadLink.text(utils.translate('uploading'));
                        uploadingIcon.addClass('active');
                        var formData = new FormData();
                        formData.append('upload', event.target.files[0]);
                        return $.ajax({
                            url: variables.urlToUploadImage,
                            data: formData,
                            processData: false,
                            contentType: false,
                            type: 'POST',
                            success: function (res) {
                                if (res.status_code == 200) {
                                    event.target.value = null;
                                    scope.$evalAsync(function () {
                                        scope.model = res.data.img_url;
                                        scope.thumb = res.data.thumb_url;
                                        if (scope.element.hasOwnProperty('width')) {
                                            scope.element.width = res.data.img_width;
                                        }
                                    });
                                    utils.notify(utils.translate('your_image_has_been_uploaded')).log();
                                } else {
                                    utils.notify(res.status_txt).error();
                                }
                            },
                            error: function (err) {
                                utils.notify(err.statusText).error();
                            },
                            complete: function () {
                                inputFile.prop('disabled', false);
                                uploadLink.text(utils.translate('browse'));
                                uploadingIcon.removeClass('active');
                            }
                        });
                    })

                    uploadLink.on('click', (e) => {
                        e.preventDefault();

                        if (/uploads.im/.test(variables.urlToUploadImage) && location.protocol == 'https:') {
                            return utils.notify('Sorry, but uploads.im don\'t support https!').error();
                        } else {
                            return uploadInput.click();
                        }
                    })
                }
            };
        }
    ])
    .directive('imageWithLink', [
        function () {
            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    link: '='
                },
                link: function (scope, elem, attrs) {
                    scope.$watch(function () {
                        return scope.link.type;
                    }, function (newValue) {
                        if (newValue !== 'none') {
                            $(elem).unwrap('a');
                            $(elem).wrap($('<a/>', {
                                href: newValue == 'link' ? scope.link.link : 'mailto:' + scope.link.link,
                                target: '_blank'
                            }).on('click', function (e) {
                                e.preventDefault();
                            }));
                        } else {
                            $(elem).unwrap('a');
                        }
                    });

                    scope.$watch(function () {
                        return scope.link.link;
                    }, function (newValue) {
                        $(elem).closest('a').attr('href', scope.link.type == 'link' ? newValue : 'mailto:' + newValue);
                    });

                }
            };
        }
    ])
    .directive('colorInput', function () {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <div>
                    <div class="current-color" ng-style="{ backgroundColor: model }"></div>
                    <input ng-model="model" colorpicker colorpicker-position="top" type="text" />
                </div>
            `,
            scope: {
                model: '='
            },
            link(scope, elem, attrs) {
                $(elem).on('click', '.current-color', () => $(elem).find('input:text').click());
                $(elem).find('input:text').on('focus', () => {
                    $(elem).addClass('focussed')
                }).on('focusout', () => {
                    $(elem).removeClass('focussed')
                });
            }
        }
    })
    .directive('mobilePreview', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                email: '='
            },
            template: `
                <iframe width="320"></iframe>
            `,
            link(scope, iframe, attrs) {
                scope.insertHtml = function (html) {
                    iframe[0].contentWindow.document.open();
                    iframe[0].contentWindow.document.write(html);
                    iframe[0].contentWindow.document.close();
                }

                $timeout(function () {
                    scope.$watch(function () {
                        return scope.email.html
                    }, scope.insertHtml)
                })

            }
        }
    }])

    /**
     * This is all filters what you need for this builder
     * You can change them, but be careful
     */
    .filter('arrToPadding', function() {
        return function (val) {
            var str = '';
            val.forEach(function (p) {
                if (p) {
                    str += p + " ";
                } else {
                    str += 0 + " ";
                }
            });
            return str;
        };
    })
    .filter('hexToRgb', function () {
        return function (hex, opacity) {
            var h = hex.replace('#', '');
            h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));

            for (var i = 0; i < h.length; i++)
                h[i] = parseInt(h[i].length == 1 ? h[i] + h[i] : h[i], 16);

            if (typeof opacity != 'undefined') {
                opacity = opacity / 100;
                h.push(opacity);
            }
            return 'rgba(' + h.join(',') + ')';
        };
    })
    .filter('translateCamelCase', ['utils', function (utils) {
        return function (key_to_translate, additional_data) {
            if (typeof key_to_translate !== 'string') return key_to_translate;
            var snake_key = utils.camelToSnake(key_to_translate);
            var translated = utils.translate(snake_key, additional_data);
            return translated === snake_key ? key_to_translate : translated;
        };
    }])
    .filter('rawHtml', ['$sce', function ($sce) {
        var div = document.createElement('div');
        return function (html, decode) {
            if (decode) {
                div.innerHTML = html;
                return $sce.trustAsHtml(div.textContent);
            }
            return $sce.trustAsHtml(html);
        };
    }]).directive('toggleTopMenu', ['$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                element.on('click', function(e) {
                    $(".left-menu").toggleClass("left-menu-hide");
                    $(".mid-view").toggleClass("show-full-view");
                 });
            }
        };
      }]);