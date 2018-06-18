angular.module('email').factory('utils', ['$filter', 'alertify', 'variables', function ($filter, alertify, variables) {
    const self = this;
    self.utils = {
        /**
         * Translate key direct in module
         * @example: utils.translate(key_to_translate, additional_data)
         * @param key_to_translate
         * @param additional_data
         * @returns {*}
         */
        translate: function (key_to_translate, additional_data) {
            return $filter('translate')(key_to_translate, additional_data);
        },
        /**
         * Convert string from snake to camel
         * @param str
         * @returns {*}
         */
        snakeToCamel: function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/_([a-z])/gi, function (m, w) {
                return "" + w.toUpperCase();
            });
        },
        /**
         * Convert camel to snake
         * @param str
         * @returns {*}
         */
        camelToSnake: function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/([A-Z])/g, function (m, w) {
                return "_" + w.toLowerCase();
            });
        },
        /**
         * Generate random id
         * @param prefix
         * @returns {string}
         */
        uid: function (prefix) {
            return (prefix || 'id') + (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000));
        },
        /**
         * https://gist.github.com/aaronmccall/9751450
         * @param list
         * @param props
         * @returns {*}
         */
        findWhere: function (list, props) {
            var idx = 0;
            var len = list.length;
            var match = false;
            var item, item_k, item_v, prop_k, prop_val;
            for (; idx < len; idx++) {
                item = list[idx];
                for (prop_k in props) {
                    // If props doesn't own the property, skip it.
                    if (!props.hasOwnProperty(prop_k)) continue;
                    // If item doesn't have the property, no match;
                    if (!item.hasOwnProperty(prop_k)) {
                        match = false;
                        break;
                    }
                    if (props[prop_k] === item[prop_k]) {
                        // We have a match…so far.
                        match = true;
                    } else {
                        // No match.
                        match = false;
                        // Don't compare more properties.
                        break;
                    }
                }
                // We've iterated all of props' properties, and we still match!
                // Return that item!
                if (match) return item;
            }
            // No matches
            return null;
        },
        /**
         * @param email
         * @returns {string|*|Object|string|string}
         */
        createEmail: function(email) {
            email = email || {}; // I know, is ugly, but is supported in es5
            let compileMjmlObject = {
                tagName: 'mjml',
                children: [{
                    tagName: 'mj-head',
                    children: [{
                        tagName: 'mj-title',
                        content: email.name
                    },
                    {
                        tagName: 'mj-style',
                        attributes: {},
                        content: `@media all and (max-width: 480px) {
                                td {
                                    width: 100%!important;
                                }
                            }`
                    }
                    ]
                },
                {
                    tagName: 'mj-body',
                    attributes: {},
                    children: [{
                        tagName: 'mj-container',
                        attributes: {
                            'background-color': email.emailSettings.options.backgroundColor,
                        },
                        children: [{
                            tagName: 'mj-wrapper',
                            attributes: {
                                'padding-top': email.emailSettings.options.paddingTop,
                                'padding-right': email.emailSettings.options.paddingRight,
                                'padding-bottom': email.emailSettings.options.paddingBottom,
                                'padding-left': email.emailSettings.options.paddingLeft,
                            },
                            children: email.elements.map((element) => {
                                switch (element.type) {
                                    case 'title':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                attributes: {
                                                    'width': '100%'
                                                },
                                                children: [{
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'color': element.options.color,
                                                        'align': element.options.align,
                                                        'padding': 0,
                                                        'font-family': element.options.font.family,
                                                        'line-height': 0
                                                    },
                                                    content: `<h1 style="font-weight: ${element.options.font.weight};font-size: 32px;line-height: 1;margin: 0;">${element.options.title}</h1>`
                                                }]
                                            },
                                            {
                                                tagName: 'mj-column',
                                                attributes: {
                                                    'width': '100%'
                                                },
                                                children: [{
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'color': element.options.color,
                                                        'align': element.options.align,
                                                        'padding': 0,
                                                        'font-family': element.options.font.family
                                                    },
                                                    content: `<h4 style="font-weight: ${element.options.font.weight};margin-bottom: 0;font-size: 16px;">${element.options.subTitle}</h4>`
                                                }]
                                            }
                                            ]
                                        }

                                    case 'button':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': 0
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                attributes: {
                                                    'width': '100%'
                                                },
                                                children: [{
                                                    tagName: 'mj-button',
                                                    attributes: {
                                                        'align': element.options.align,
                                                        'border': `${element.options.border.size}px ${element.options.border.style} ${element.options.border.color}`,
                                                        'border-radius': `${element.options.border.radius}px`,
                                                        'background-color': element.options.buttonBackgroundColor,
                                                        'font-family': `${element.options.font.family}`,
                                                        'color': element.options.font.color,
                                                        'font-size': `${element.options.font.size}px`,
                                                        'font-weight': element.options.font.weight,
                                                        'width': Boolean(element.options.fullWidth) ? '100%' : 'auto',
                                                        'padding': `${element.options.margin[0]} ${element.options.margin[1]} ${element.options.margin[2]} ${element.options.margin[3]}`,
                                                        'inner-padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`,
                                                        'href': element.options.url
                                                    },
                                                    content: element.options.buttonText
                                                }]
                                            }]
                                        }
                                    case 'text':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': 0,
                                                        'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text
                                                }]
                                            }]
                                        }
                                    case 'divider':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'padding': 0
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-divider',
                                                    attributes: {
                                                        'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`,
                                                        'container-background-color': element.options.backgroundColor,
                                                        'border-width': `${element.options.border.size}px`,
                                                        'border-style': `${element.options.border.style}`,
                                                        'border-color': `${element.options.border.color}`
                                                    }
                                                }]
                                            }]
                                        }

                                    case 'image':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'align': element.options.align,
                                                        'src': element.options.image,
                                                        'alt': element.options.altTag,
                                                        'width': element.options.width,
                                                        'padding': 0,
                                                        'href': element.options.linkTo.type === 'link' && element.options.linkTo.link || element.options.linkTo.type === 'email' && `mailto:${element.options.linkTo.link}` || null
                                                    }
                                                }]
                                            }]
                                        }
                                    case 'imageTextRight':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'align': element.options.align,
                                                        'src': element.options.image,
                                                        'alt': element.options.altTag,
                                                        'padding': 0,
                                                        'padding-right': '5px',
                                                        'width': element.options.width,
                                                        'href': element.options.linkTo.type === 'link' && element.options.linkTo.link || element.options.linkTo.type === 'email' && `mailto:${element.options.linkTo.link}` || null
                                                    }
                                                }]
                                            },
                                            {
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': 0,
                                                        'padding-left': '5px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text
                                                }]
                                            }
                                            ]
                                        }
                                    case 'imageTextLeft':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': 0,
                                                        'padding-right': '5px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text
                                                }]
                                            },
                                            {
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'align': element.options.align,
                                                        'src': element.options.image,
                                                        'alt': element.options.altTag,
                                                        'padding': 0,
                                                        'padding-left': '5px',
                                                        'width': element.options.width,
                                                        'href': element.options.linkTo.type === 'link' && element.options.linkTo.link || element.options.linkTo.type === 'email' && `mailto:${element.options.linkTo.link}` || null
                                                    }
                                                }]
                                            }]
                                        }
                                    case 'imageText2x2':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'src': element.options.image1,
                                                        'alt': element.options.altTag1,
                                                        'padding': '0 5px',
                                                        'width': element.options.width1,
                                                        'href': element.options.linkTo1.type === 'link' && element.options.linkTo1.link || element.options.linkTo1.type === 'email' && `mailto:${element.options.linkTo1.link}` || null
                                                    }
                                                },
                                                {
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': '0 5px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text1
                                                }
                                                ]
                                            },
                                            {
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'src': element.options.image2,
                                                        'alt': element.options.altTag2,
                                                        'padding': '0 5px',
                                                        'width': element.options.width2,
                                                        'href': element.options.linkTo2.type === 'link' && element.options.linkTo2.link || element.options.linkTo2.type === 'email' && `mailto:${element.options.linkTo2.link}` || null
                                                    }
                                                },
                                                {
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': '0 5px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text2
                                                }
                                                ]
                                            }
                                            ]
                                        }
                                    case 'imageText3x2':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'src': element.options.image1,
                                                        'alt': element.options.altTag1,
                                                        'padding': '0 3px 3px',
                                                        'width': element.options.width1,
                                                        'href': element.options.linkTo1.type === 'link' && element.options.linkTo1.link || element.options.linkTo1.type === 'email' && `mailto:${element.options.linkTo1.link}` || null
                                                    }
                                                },
                                                {
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': '0 3px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text1
                                                }
                                                ]
                                            },
                                            {
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'src': element.options.image2,
                                                        'alt': element.options.altTag2,
                                                        'padding': '0 3px 3px',
                                                        'width': element.options.width2,
                                                        'href': element.options.linkTo2.type === 'link' && element.options.linkTo2.link || element.options.linkTo2.type === 'email' && `mailto:${element.options.linkTo2.link}` || null
                                                    }
                                                },
                                                {
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': '0 3px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text2
                                                },
                                                ]
                                            },
                                            {
                                                tagName: 'mj-column',
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'src': element.options.image3,
                                                        'alt': element.options.altTag3,
                                                        'padding': '0 3px 3px',
                                                        'width': element.options.width3,
                                                        'href': element.options.linkTo3.type === 'link' && element.options.linkTo3.link || element.options.linkTo3.type === 'email' && `mailto:${element.options.linkTo3.link}` || null
                                                    }
                                                },
                                                {
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'font-size': '13px',
                                                        'color': 'rgb(0, 0, 0)',
                                                        'line-height': '20px',
                                                        'padding': '0 3px',
                                                        'font-family': 'Arial, sans-serif'
                                                        // 'font-family': element.options.font.family
                                                    },
                                                    content: element.options.text3
                                                },
                                                ]
                                            }
                                            ]
                                        }
                                    case 'social':
                                        let links = '';
                                        Object.keys(element.options.links).forEach(key => {
                                            if (element.options.links[key].active) {
                                                links += `<a href="${element.options.links[key].link}" target="_blank" style="border: none;text-decoration: none;">
                                                            <img border="0" src="${variables.assetsPath}/social/${key}.png">
                                                         </a>`
                                            }
                                        })

                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                attributes: {
                                                    'width': '100%'
                                                },
                                                children: [{
                                                    tagName: 'mj-text',
                                                    attributes: {
                                                        'color': element.options.color,
                                                        'align': element.options.align,
                                                        'padding': 0,
                                                        'font-family': 'Arial, sans-serif',
                                                        'line-height': 0
                                                    },
                                                    content: links
                                                }]
                                            }]
                                        }
                                    case 'navBar':
                                        return {
                                            tagName: 'mj-navbar',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'vertical-align': 'middle',
                                                'border': `${element.options.border.size}px ${element.options.border.style} ${element.options.border.color}`,
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                attributes: {
                                                    'vertical-align': 'middle',
                                                    'width': '20%'
                                                },
                                                children: [{
                                                    tagName: 'mj-image',
                                                    attributes: {
                                                        'src': element.options.image,
                                                        'alt': 'Logo',
                                                        'width': '100%',
                                                        'padding-right': '15px'
                                                    }
                                                }]
                                            },{
                                                tagName: 'mj-column',
                                                attributes: {
                                                    'vertical-align': 'middle',
                                                    'width': '80%'
                                                },
                                                children: [{
                                                    tagName: 'mj-inline-links',
                                                    attributes: {
                                                        'align': element.options.align,
                                                        'base-url': element.options.items[0].href,
                                                        'hamburger': 'hamburger',
                                                        'ico-color': element.options.color
                                                    },
                                                    children: element.options.items.map(item => {
                                                        return {
                                                            tagName: 'mj-link',
                                                            attributes: {
                                                                color: element.options.color,
                                                                'href': item.href || 'https://flashyapp.com',
                                                                'font-size': `${element.options.font.size}px`,
                                                                'font-family': element.options.font.family,
                                                                'font-weight': element.options.font.weight
                                                            },
                                                            content: item.title
                                                        }
                                                    })
                                                }]
                                            }]
                                        };
                                    case 'location':
                                        return {
                                            tagName: 'mj-section',
                                            attributes: {
                                                'full-width': 'full-width',
                                                'vertical-align': 'middle',
                                                'background-color': element.options.backgroundColor,
                                                'padding': `${element.options.padding[0]} ${element.options.padding[1]} ${element.options.padding[2]} ${element.options.padding[3]}`
                                            },
                                            children: [{
                                                tagName: 'mj-column',
                                                attributes: {},
                                                children: [{
                                                    tagName: 'mj-location',
                                                    attributes: {
                                                        'font-size': `${element.options.font.size}px`,
                                                        'font-family': element.options.font.family,
                                                        'font-weight': element.options.font.weight,
                                                        'color': element.options.color,
                                                        'padding': 0,
                                                        'img-src': element.options.image,
                                                        'address': element.options.address
                                                    }
                                                }]
                                            }]
                                        };
                                    default:
                                        return false;
                                }
                            })
                        }]
                    }]
                }
                ]
            }
            return new Promise(function (succesFn, rejectFn) {
                if (!variables.mjmlCompileAdress && (!variables.mjmlPublicKey || !variables.mjmlApplicationId)) {
                    return rejectFn('You did\'nt include compile address for MJML or MJML API keys!');
                }
                if (variables.mjmlPublicKey && variables.mjmlApplicationId) {
                    console.log("post start")
                    return $.ajax({
                        url: 'https://api.mjml.io/v1/render',
                        method: 'POST',
                        data: JSON.stringify({ mjml: JSON.stringify(compileMjmlObject) }),
                        datatype: 'json',
                        processData: false,
                        beforeSend(req) {
                            req.setRequestHeader('Authorization', `Basic ${btoa(`${variables.mjmlApplicationId}:${variables.mjmlPublicKey}`)}`)
                        },
                        success(data) {
                            console.log("post sucess",data)
                            return succesFn(data)
                        }
                    })
                }
                return $.post(variables.mjmlCompileAdress, JSON.stringify(compileMjmlObject)).then(succesFn);
            });
        },
        /**
         * Notify
         * @param msg
         * @param callback
         * @returns {{log: utils.log, success: utils.success, error: utils.error}}
         */
        notify: function (msg, callback) {
            return {
                log: function () {
                    return alertify.log(msg, callback);
                },
                success: function () {
                    alertify.success(msg, callback);
                },
                error: function () {
                    alertify.error(msg, callback);
                }
            };
        },
        /**
         * Confirm dialog
         * @param msg
         * @param succesFn
         * @param cancelFn
         * @param okBtn
         * @param cancelBtn
         * @returns {IAlertify}
         */
        confirm: function (msg, succesFn, cancelFn, okBtn, cancelBtn) {
            return alertify
                .okBtn(okBtn)
                .cancelBtn(cancelBtn)
                .confirm(msg, succesFn, cancelFn);
        },
        /**
         * Alert dialog
         * @param msg
         * @returns {IAlertify}
         */
        alert: function (msg) {
            return alertify
                .okBtn("Accept")
                .alert(msg);
        },
        /**
         * Prompt dialog
         * @param defaultvalue
         * @param promptMessage
         * @param successFn
         * @param cancelFn
         * @returns {IAlertify}
         */
        prompt: function (defaultvalue, promptMessage, successFn, cancelFn) {
            return alertify
                .defaultValue(defaultvalue)
                .prompt(promptMessage, successFn, cancelFn);
        },
        /**
         * Validate email before save and import
         * @param emailToValidate
         * @returns {boolean}
         */
        validateEmail: function (emailToValidate) {
            return angular.isObject(emailToValidate) &&
                // emailToValidate.hasOwnProperty('name') &&
                angular.isArray(emailToValidate.elements) &&
                angular.isString(emailToValidate.html) &&
                angular.isObject(emailToValidate.emailSettings) &&
                emailToValidate.emailSettings.type == 'emailSettings' &&
                angular.isObject(emailToValidate.emailSettings.options);
        },
        /**
         * Track events with Google Analytics
         * @param category
         * @param event
         * @param name
         * @returns {*}
         */
        trackEvent: function (category, event, name) {
            if (variables.trackEvents && window.ga) {
                return window.ga('send', 'event', category, event, name);
            } else if (variables.trackEvents && !window.ga) {
                return console.info('To track events, add Google UA in config.json file!');
            }
        },
        removeLineBreaks: function (html) {
            return html.replace(/\n\s*\n/gi, '\n');
        }
    };
    return self.utils;
}])