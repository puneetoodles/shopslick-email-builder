angular.module('email.builder').controller('emailCtrl', ['$scope', '$rootScope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location',
        function ($scope, $rootScope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location) {
            
            /**
             * Sync with store
             */
            storage.get().then(function (email) {
                $scope.Email = email;
                $scope.cloneEmail = JSON.parse(JSON.stringify(email));
                $scope.$evalAsync(function () {
                    $scope.currentElement = $scope.Email.emailSettings;
                })
            });

            /**
             * All elements to drag and drop
             * @type {*[]}
             */
            $scope.elements = Object.keys(variables.blocks).map(function (key) {
                return variables.blocks[key].element
            }).sort(function (elem, elem2) {
                return variables.blocks[elem.type].sort - variables.blocks[elem2.type].sort
            }).filter(function (elem) {
                return variables.disableBlocks.indexOf(elem.type) === -1
            })

            /**
             * Check variables from HTML
             */
            $scope.getVariable = function (prop) {
                return variables[prop]
            }

            /**
             * Default language
             * @type {string}
             */
            $scope.currentLanguage = 'en';
            /**
             * Tinymce options
             * @type {{inline: boolean, skin: string, theme: string, plugins: string[], toolbar: string, fontsize_formats: string}}
             */
            $scope.tinymceOptions = {
                language : $scope.currentLanguage,
                inline: true,
                skin: 'lightgray',
                theme: 'modern',
                plugins: ["advlist autolink lists link image charmap", "searchreplace visualblocks code", "insertdatetime media table contextmenu paste", 'textcolor'],
                toolbar: "undo redo | bold italic fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link",
                fontsize_formats: '8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 18pt 24pt 36pt'
            };

            /**
             * Include Mailchimo Merge tags in Tinymce if is enabled
             */
            if (variables.includeMailchimpMergeTags) {
                $scope.tinymceOptions = angular.extend($scope.tinymceOptions, {
                    setup: function (editor) {
                        editor.addButton('mailchimpMergeTags', {
                            type: 'menubutton',
                            text: 'Merge Tags',
                            icon: false,
                            menu: ['*|FNAME|*', '*|LNAME|*', '*|EMAIL|*', '*|LIST:NAME|*', '*|LIST:COMPANY|*', '*|LIST:SUBSCRIBERS|*', '*|USER:COMPANY|*', '*|USER:ADDRESS|*', '*|USER:PHONE|*', '*|MC:DATE|*', '*|CURRENT_YEAR|*', '*|UNSUB|*', '*|UPDATE_PROFILE|*'].map(function (tag) {
                                return {
                                    text: tag,
                                    onclick: function () {
                                        editor.insertContent(tag);
                                    }
                                }
                            })
                        });
                    }
                });
            }

            $scope.addSocialNetwork = function (links, selectedNetwork) {
                if (selectedNetwork) {
                    links[selectedNetwork].active = true
                }
            }

            $scope.addNewMenuItem = function (block) {
                return block.options.items.push(Object.assign({}, {title: 'Title', href: ''}))
            }

            $scope.deleteMenuItem = function (currentElement, item) {
                currentElement.options.items = currentElement.options.items.filter(it => it !== item)
            }

            /**
             * Get template by type
             *
             * @param type
             * @returns {string}
             */
            $scope.getTemplate = function (type) {
                return type ? type + 'Template' : 'textTemplate';
            };
            /**
             * Remove block element by id
             * @param id
             */
            $scope.removeElement = function (id) {
                return utils.confirm(utils.translate('are_you_sure'), function () {
                    var el = utils.findWhere($scope.Email.elements, {id});
                    $scope.Email.elements.splice($scope.Email.elements.indexOf(el), 1);
                    utils.trackEvent('Elements', 'remove', el.type);
                    $scope.currentElement = $scope.Email.emailSettings;
                    $scope.$apply();
                }, null, utils.translate('delete_element'), utils.translate('do_not_remove_element'));
            };
            /**
             * Clone block element by id
             * @param id
             */
            $scope.cloneElement = function (id) {
                var el = utils.findWhere($scope.Email.elements, {id});
                var newEl = JSON.parse(JSON.stringify(el));
                newEl.id = utils.uid();
                utils.trackEvent('Elements', 'clone', newEl.type);
                $scope.Email.elements.splice($scope.Email.elements.indexOf(el) + 1, 0, newEl);
                // $scope.changeHtml()
            };
            /**
             * Edit block element by id
             * @param id
             */
            $scope.editElement = function (id) {
                if (!id) {
                    return $scope.currentElement = $scope.Email.emailSettings
                }
                if ($scope.preview) return;
                $scope.currentElement = id != 'emailSettings' ? utils.findWhere($scope.Email.elements, {id}) : $scope.Email[id];
                $scope.currentElement && utils.trackEvent('Email', 'edit', $scope.currentElement.type);
            };
            /**
             * Change languge
             * @param key
             * @returns {Server|Object|string}
             */
            $scope.changeLanguage = function (key) {
                $scope.currentLanguage = key;
                return $translate.use(key);
            };
            /**
             * Check if email has changed, to enable or disable save button
             * @returns {boolean}
             */
            $scope.hasChanges = function () {
                return !angular.equals($scope.Email, $scope.cloneEmail)
            };
            /**
             * Save email example
             */
            $scope.saveEmailTemplate = function () {
                utils.createEmail($scope.Email).then(function (res) {
                    if (res.errors.length) {
                        return utils.notify(res.errors.map(function (err) {
                            return err.message
                        }).join('<br>')).error()
                    } else {
                        $scope.Email.html = res.html;
                        // $scope.Email = is what you need to save
                        storage.put($scope.Email).then(function () {
                            utils.notify(utils.translate('email_saved')).success();
                            utils.trackEvent('Email', 'saved');
                            $scope.cloneEmail = JSON.parse(JSON.stringify($scope.Email));
                            $scope.$evalAsync(function () {
                                $scope.currentElement = $scope.Email.emailSettings
                            })
                        });
                    }
                }, function (err) {
                    return utils.notify(err).error()
                })
            };

            /**
             * Open export container
             * @returns {*}
             */
            $scope.openExportContainer = function () {
                if (!$scope.Email.elements.length)
                    return utils.notify(utils.translate('nothing_to_export')).log();
                $scope.exportAsHtml = false;
                $scope.currentElement = 'export';
                // $scope.changeHtml();
            };

            /**
             * Export email as JSON
             * @returns {*|{trigger, _default}}
             */
            $scope.exportEmailAsJson = function () {
                var a = document.createElement('a');
                a.target = '_blank';
                utils.trackEvent('Email', 'export', 'JSON');
                a.href = 'data:attachment/json,' + encodeURI(JSON.stringify($scope.Email));
                a.download = utils.uid('export') + '.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

            /**
             * Download Email as HTML
             */
            $scope.downloadHtml = function () {
                var a = document.createElement('a');
                a.target = '_blank';
                utils.trackEvent('Email', 'export', 'HTML');
                a.href = 'data:attachment/html,' + encodeURI($scope.Email.html);
                a.download = utils.uid('export') + '.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

            /**
             * Import email
             * @returns {*}
             */
            $scope.importEmail = function () {
                var file = $('<input />', {
                    type: 'file',
                    name: 'import-file'
                }).on('change', function () {
                    var importedFile = new FileReader();
                    importedFile.onload = function () {
                        var importedData = JSON.parse(importedFile.result);
                        if (utils.validateEmail(importedData)) {
                            storage.put(importedData).then(function () {
                                utils.trackEvent('Email', 'import');
                                $scope.$evalAsync(function () {
                                    $scope.currentElement = undefined;
                                    $scope.Email = importedData;
                                    $scope.cloneEmail = JSON.parse(JSON.stringify(importedData));
                                });
                                utils.notify(utils.translate('email_has_been_imported', {
                                    lastModified: new Date(fileToImport.lastModified).toLocaleString()
                                })).success()
                            });
                        } else {
                            utils.notify(utils.translate('imported_data_isnt_valid')).error()
                        }
                    };
                    var fileToImport = this.files[0];
                    if (fileToImport.name.slice(-4) !== 'json') {
                        return utils.notify(utils.translate('invalid_format_file')).log()
                    }
                    importedFile.readAsText(fileToImport)
                });

                if (!$scope.Email.elements.length)
                    return file.click();

                return utils.confirm(utils.translate('before_import'), function () {
                    return file.click()
                }, function () {
                    return utils.notify(utils.translate('import_canceled')).log()
                }, utils.translate('accept'), utils.translate('deny'))
            };

            /**
             * Activate preview Email
             * @returns {*}
             */
            $scope.previewEmail = function () {
                if (!$scope.Email.elements.length)
                    return utils.notify(utils.translate('nothing_to_preview')).log();
                utils.trackEvent('Email', 'preview');
                $scope.preview = true;
                $scope.currentElement = undefined;
            };

            /**
             * Show and hide tinymce on preview
             */
            $scope.$watch('preview', function (newV) {
                tinymce.editors.forEach(function (editor) {
                    return editor[newV ? 'hide' : 'show']();
                })
            })

            $scope.mobilePreview = false;

            /**
             * Delete all elements from builder
             * @returns {*}
             */
            $scope.deleteAllElements = function () {
                return utils.confirm(utils.translate('before_delete_all_elements'), function () {
                    return storage.delete().then(function (email) {
                        $scope.$evalAsync(function () {
                            $scope.currentElement = undefined;
                            $scope.Email = email;
                            $scope.cloneEmail = JSON.parse(JSON.stringify(email));
                        });
                    });
                }, null, utils.translate('accept'), utils.translate('deny'))
            };

            /**
             * Dragula configuration for builder elements
             */
            dragulaService.options($scope, 'element', {
                isContainer: function (el) {
                    return el.classList.contains('email-container');
                },
                copy: true,
                copySortSource: false,
                removeOnSpill: true,
                moves: function (el, source, handle, sibling) {
                    return !$(source).hasClass('email-container');
                },
                invalid: function (el, handle) {
                    return false; // don't prevent any drags from initiating by default
                }
            });
            /**
             * Dragula configuration for builder
             */
            dragulaService.options($scope, 'element-html', {
                copy: false,
                copySortSource: false,
                moves: function (el, source, handle, sibling) {
                    return $(handle).hasClass('move');
                },
                invalid: function (el, handle) {
                    return false; // don't prevent any drags from initiating by default
                }
            });
            /**
             * Drag and drop events for elements
             */
            $scope.$on('element.drop', function (event, el, target, source, sibling) {
                const elementType = $(el).data('type'), index = $(sibling).index();
                $('.email-container li[data-type]').remove();
                const element = $.extend(true, {}, {
                    id: utils.uid(),
                    type: elementType,
                    options: variables.blocks[elementType].defaultOptions
                });
                index == -1 ? $scope.Email.elements.push(element) : $scope.Email.elements.splice(index - 1, 0, element);
                utils.trackEvent('Elements', 'drop', element.type);
                $scope.$apply();
            });
            /**
             * Drag and drop events for elements inside the builder
             */
            $scope.$on('element-html.drop', function (event, el, target, source, sibling) {
                var id = $(el).attr('id');
                var index = $(sibling).index();
                if (index == -1) {
                    index = $scope.Email.elements.length - 1;
                } else {
                    index--;
                }
                var element = utils.findWhere($scope.Email.elements, {id});
                var oldIndex = $scope.Email.elements.indexOf(element);
                if (index >= $scope.Email.elements.length) {
                    var k = index - $scope.Email.elements.length;
                    while ((k--) + 1) {
                        $scope.Email.elements.push(undefined);
                    }
                }
                $scope.Email.elements.splice(index, 0, $scope.Email.elements.splice(oldIndex, 1)[0]);
                $scope.$apply();
                // $scope.currentElement = undefined;
                return false;
            });
        }
    ]);