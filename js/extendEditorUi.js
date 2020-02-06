// Extends EditorUi to update I/O action states based on availability of backend
(function () {
  var editorUiInit = EditorUi.prototype.init;

  EditorUi.prototype.init = function () {
    editorUiInit.apply(this, arguments);
    this.actions.get('export').setEnabled(false);

    // Updates action states which require a backend
    if (!Editor.useLocalStorage) {
      mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
        var enabled = req.getStatus() != 404;
        this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
        this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
        this.actions.get('save').setEnabled(enabled);
        this.actions.get('saveAs').setEnabled(enabled);
        this.actions.get('export').setEnabled(enabled);
      }));
    }
  };

  // Adds required resources (disables loading of fallback properties, this can only
  // be used if we know that all keys are defined in the language specific file)
  mxResources.loadDefaultBundle = false;
  var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
    mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

  // Fixes possible asynchronous requests
  mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
    // Adds bundle text to resources
    mxResources.parse(xhr[0].getText());

    // Configures the default graph theme
    var themes = {};
    themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

    // Main
    var main = new EditorUi(new Editor(urlParams['chrome'] == '0', themes));
    window.m = main;

    var pallete = [];
    api('GetPalette').then(function (data) {
      pallete = data;
    }).catch(function () {
      pallete = [{
        "displayName": "Ворота",
        "className": "Gate",
        "groupName": "Склад",
        "frame": {
          "x1": 0,
          "y1": 0,
          "x2": 300,
          "y2": 3000
        },
        "graphics": [
          {
            "frame": {
              "x1": 0,
              "y1": 0,
              "x2": 300,
              "y2": 3000
            },
            "shapeName": "Rectangle"
          }
        ],
        "defaultSize": {
          "x1": 0,
          "y1": 0,
          "x2": 300,
          "y2": 3000
        },
        "minSize": {
          "x1": 0,
          "y1": 0,
          "x2": 100,
          "y2": 2000
        },
        "maxSize": {
          "x1": 0,
          "y1": 0,
          "x2": 1000,
          "y2": 6000
        },
        "defaultText": "Ворота",
        "properties": [
          {
            "displayName": "Номер ворот",
            "propName": "Nr",
            "groupName": "Общее",
            "propType": "String",
            "dataSource": {
              "url": "",
              "jsMethod": ""
            },
            "onChange": {
              "url": "",
              "jsMethod": ""
            }
          },
          {
            "displayName": "Штрихкод",
            "propName": "Barcode",
            "groupName": "Общее",
            "propType": "String",
            "dataSource": {
              "url": "",
              "jsMethod": ""
            },
            "onChange": {
              "url": "",
              "jsMethod": ""
            }
          }
        ],
        "onDblClick": {
          "url": "",
          "jsMethod": ""
        },
        "onChange": {
          "url": "",
          "jsMethod": ""
        }
      },
        {
          "displayName": "Стеллаж",
          "className": "Rack",
          "groupName": "Склад",
          "frame": {
            "x1": 0,
            "y1": 0,
            "x2": 300,
            "y2": 3000
          },
          "graphics": [
            {
              "frame": {
                "x1": 0,
                "y1": 0,
                "x2": 1000,
                "y2": 2708
              },
              "shapeName": "Rectangle"
            }
          ],
          "defaultSize": {
            "x1": 0,
            "y1": 0,
            "x2": 1000,
            "y2": 2708
          },
          "minSize": {
            "x1": 0,
            "y1": 0,
            "x2": 1000,
            "y2": 2708
          },
          "maxSize": {
            "x1": 0,
            "y1": 0,
            "x2": 1000,
            "y2": 2708
          },
          "defaultText": "Стеллаж",
          "properties": [
            {
              "displayName": "Номер",
              "propName": "Nr",
              "groupName": "Общее",
              "propType": "String",
              "dataSource": {
                "url": "",
                "jsMethod": ""
              },
              "onChange": {
                "url": "",
                "jsMethod": ""
              }
            },
            {
              "displayName": "Штрихкод",
              "propName": "Barcode",
              "groupName": "Общее",
              "propType": "String",
              "dataSource": {
                "url": "",
                "jsMethod": ""
              },
              "onChange": {
                "url": "",
                "jsMethod": ""
              }
            }
          ],
          "onDblClick": {
            "url": "",
            "jsMethod": ""
          },
          "onChange": {
            "url": "",
            "jsMethod": ""
          }
        },
        {
          "displayName": "Стеллаж",
          "className": "Rack",
          "groupName": "",
          "frame": {
            "x1": 0,
            "y1": 0,
            "x2": 300,
            "y2": 3000
          },
          "graphics": [
            {
              "frame": {
                "x1": 0,
                "y1": 0,
                "x2": 1000,
                "y2": 2708
              },
              "shapeName": "Rectangle"
            }
          ],
          "defaultSize": {
            "x1": 0,
            "y1": 0,
            "x2": 1000,
            "y2": 2708
          },
          "minSize": {
            "x1": 0,
            "y1": 0,
            "x2": 1000,
            "y2": 2708
          },
          "maxSize": {
            "x1": 0,
            "y1": 0,
            "x2": 1000,
            "y2": 2708
          },
          "defaultText": "Стеллаж",
          "properties": [
            {
              "displayName": "Номер",
              "propName": "Nr",
              "groupName": "Общее",
              "propType": "String",
              "dataSource": {
                "url": "",
                "jsMethod": ""
              },
              "onChange": {
                "url": "",
                "jsMethod": ""
              }
            },
            {
              "displayName": "Штрихкод",
              "propName": "Barcode",
              "groupName": "Общее",
              "propType": "String",
              "dataSource": {
                "url": "",
                "jsMethod": ""
              },
              "onChange": {
                "url": "",
                "jsMethod": ""
              }
            }
          ],
          "onDblClick": {
            "url": "",
            "jsMethod": ""
          },
          "onChange": {
            "url": "",
            "jsMethod": ""
          }
        }
      ];

      m.sidebar.addTopologyPallete(true);
    });
  }, function () {
    document.body.innerHTML = '<div style="margin:10% auto 0;">Error loading resource files. Please check browser console.</div>';
  });
})();
