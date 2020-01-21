var pallete = (function () {
  var data = [
    {
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
    }
  ];

  return data;
})();
