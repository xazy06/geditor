/**
 *
 * @param mx
 * @constructor
 * Процесс редактирования
   В коде приложения задать свойства редактора:
   Базовый URL;
   Относительный URL для загрузки палитры объектов;
   Относительный URL для загрузки чертежа;
   Относительный URL для сохранения;
   Вызвать метод Редактировать чертёж или Создать новый чертёж;
   В процессе редактирования редактор должен:
   Контролировать изменение свойств объекта, для которых установлен валидатор. В случае изменения свойства должен быть вызван соответствующий валидатор;
   Контролировать пересечение объектов, если для объектов установлены ограничения по пересечениям;
   Контролировать размеры объекта, если для объекта установлены ограничения по размерам;
   Если в процессе работы компонент не может выполнить какое-нибудь действие из-за отсутствия необходимых настроек, например BaseUrl, компонент должен явно выводить сообщение об ошибке;
 */
var Topology = function (mx) {
  var _this = this;

  /**
   * * @type {X2JS}
   */
  this.x2js = new X2JS();

  /**
   * @type {null}
   */
  this.editor = mx || null;

  /**
   * @type {String}
   * Назначение: Базовый URL для обращения к сервисам;
   */
  this.BaseUrl = null;

  /**
   * @type {String}
   * Назначение: Относительный URL для загрузки палитры компонентов;
   */
  this.GetPaletteUrl = null;

  /**
   * @type {String}
   * Назначение: Имя скрипта для загрузки палитры компонентов;
   */
  this.GetPaletteScript = null;

  /**
   * @type {String}
   * Назначение: Относительный URL для загрузки чертежа;
   */
  this.LoadModelUrl = null;

  /**
   * @type {String}
   * Назначение: Имя скрипта для загрузки чертежа;
   */
  this.LoadModelScriptl = null;

  /**
   * @type {String}
   * Назначение: Относительный URL для сохранения чертежа;
   */
  this.SaveModelUrl = null;

  /**
   * @type {String}
   * Назначение: Имя скрипта для сохранения чертежа;
   */
  this.SaveModelScript = null;

  function MxModel() {
    this.mxGraphModel = {
      root: {
        mxCell: [{
          _id: '0'
        }, {
          _id: '1',
          _parent: '0'
        }]
      },
      _dx: '',
      _dy: '',
      _grid: '1',
      _gridSize: '',
      _guides: '1',
      _tooltips: '1',
      _connect: '1',
      _arrows: '1',
      _fold: '1',
      _page: '1',
      _pageScale: '1',
      _pageWidth: '827',
      _pageHeight: '1169'
    };
  }

  /**
   *
   * @type {{New: Topology.actions.New, Load: Topology.actions.Load, getGraphJSON: (function(): *), getGraphXml: (function(): (*|string)), Save: Topology.actions.Save}}
   */
  this.actions = {
    /**
     *
     * @returns {*|string}
     */
    getGraphXml: function () {
      return mxUtils.getXml(_this.editor.editor.getGraphXml());
    },

    /**
     *
     * @returns {*}
     */
    getGraphJSON: function () {
      return _this.x2js.xml_str2json(this.getGraphXml());
    },

    parseTopologyModel (topologyModel) {
      var mxModel = new MxModel();

      topologyModel = topologyModel ||
      {
        "BgColor": "#4D4D4D",
        "History": {
          "Center": {
            "X1": 928,
              "Y1": 294
          },
          "Scale": 0.25400050800101603,
            "Unit": "mm",
            "ShowGrid": true,
            "GridScale": 2.5,
            "SnapToGrid": true,
            "SnapToNearest": true,
            "SnapStrength": 1
        },
        "Items": [
          {
            "Uuid": "2",
            "ClassName": "Rack",
            "Font": {
              "Weight": 400,
              "Bold": false,
              "Italic": false,
              "Underline": false
            },
            "Text": "Стеллаж",
            "Layer": "1",
            "Frame": {
              "X1": 120,
              "X2": 220,
              "Y1": 80,
              "Y2": 350.8
            },
            "Angle": 0,
            "PropValues": [
              {
                "Номер": "ef"
              },
              {
                "Штрихкод": "efe"
              }
            ]
          }
        ]
      };

      if(topologyModel.BgColor) {
        mxModel.mxGraphModel._background = topologyModel.BgColor;
      }

      mxModel.mxGraphModel._dx = topologyModel.History.Center.X1;
      mxModel.mxGraphModel._dy = topologyModel.History.Center.Y1;
      mxModel.mxGraphModel._grid = +topologyModel.History.ShowGrid;
      mxModel.mxGraphModel._gridSize = 10;
      mxModel.mxGraphModel._pageScale=  "1";

      function SimpleCellModel() {
        this._value = null;
        this.__id = null;
        this.mxGeometry = null;
        this._style = null;
        this._className = null;
        this._vertex = null;
      }

      function Layer(id, parent) {
        this._id = id;
        this._parent = '0';

        if(parent !== undefined) {
          this._parent = parent;
        }
      }

      function MxGeometry(TFrame) {
        this._x = TFrame.X1;
        this._y = TFrame.Y1;
        this._width = TFrame.X2 - TFrame.X1;
        this._height = TFrame.Y2 - TFrame.Y1;
        this._as = 'geometry';
      }

      function parseTStyles(TModel) {
        var stylePropsFromT = {
          rotation: TModel.Angle,
          strokeColor: TModel.FrontColor,
          fillColor: TModel.BgColor,
          fontColor: TModel.Font.Color,
          fontFamily: TModel.Font.FontName,
          // fontSize: TModel.Font.Weight,
          fontStyle: TModel.Font.Bold && '7' || '4',
          whiteSpace: 'wrap',
          html: '1',
          rounded: '0'
        };

        _.each(stylePropsFromT, function (v, k) {
          if(v === undefined) {
            delete stylePropsFromT[k];
          }
        });

        stylePropsFromT = _.map(stylePropsFromT, function(v, k) {
          return k + '=' + v;
        });

        return (stylePropsFromT.join(';') + ';')
      }

      function addAttributes2Cell(attrs, cell) {
        var obj = {
          'object': {
            _label: cell._value,
            _id: cell._id
          }
        };

        delete cell._id;
        delete cell._value;

        obj['object'].mxCell = cell;

        _.each(attrs, function(val) {
          var key = _.keys(val)[0];
          obj['object'][('_' + key)] = val[key];
        });

        return obj;
      }

      function checkExecutedLayers(sourceItems, target) {
        var layersUsedInT = [],
          defaultLayersInMx = [],
          layersLess = false,
          idListOfAddedLayers = [];

        _.each(sourceItems, function(item) {
          if(layersUsedInT.length === 0) {
            layersUsedInT.push(item.Layer);
          }else if(layersUsedInT.indexOf(item.Layer) === -1) {
            layersUsedInT.push(item.Layer);
          }
        });

        defaultLayersInMx = _.map(target, function (c) {
          return c._id;
        });

        for (var i in layersUsedInT) {

          if(layersUsedInT.hasOwnProperty(i)) {

            layersLess = false;

            if(defaultLayersInMx.indexOf(layersUsedInT[i]) === -1) {
              target.push(new Layer(layersUsedInT[i]));
              idListOfAddedLayers.push(layersUsedInT[i]);

              layersLess = true;
            }
          }
        }

        window.console && window.console.log({
          layersLess: layersLess,
          idListOfAddedLayers: idListOfAddedLayers
        });

        return {
          layersLess: layersLess,
          idListOfAddedLayers: idListOfAddedLayers
        };
      }

      function appendCells(sourceItems, target) {
        _.map(sourceItems, function(item) {
          var cell = new SimpleCellModel();

          cell._id = item.Uuid;
          cell.__id = item.Text;
          cell._value = item.Text;
          cell._className = item.ClassName;
          cell._vertex = "1";
          cell._parent = item.Layer;
          cell.mxGeometry = new MxGeometry(item.Frame);
          cell._style = parseTStyles(item);

          if(item.PropValues) {
            cell = addAttributes2Cell(item.PropValues, cell);

            if (!mxModel.mxGraphModel.root.object) {
              mxModel.mxGraphModel.root.object = [];
            }

            mxModel.mxGraphModel.root.object.push(cell.object);

            return
          }

          target.push(cell);
        })

      }

      checkExecutedLayers(topologyModel.Items, mxModel.mxGraphModel.root.mxCell);

      appendCells(topologyModel.Items, mxModel.mxGraphModel.root.mxCell);

      return mxModel;
    },

    parseTopologyModel2XML: function(tm) {
      return _this.x2js.json2xml(this.parseTopologyModel(tm));
    },

    /**
     *
     * @returns {Model}
     */
    parseGraph: function () {
      var model = null, gModel = null;

      model = new Model();
      gModel = this.getGraphJSON();

      function parseCellStyle (style) {
        var stylesMap = null;

        style = style.split(';').pop();

        stylesMap = {};

        _.each(style, function(property){
          property = property.split('=');
          stylesMap[property[0]] = property[1]
        });

        return stylesMap;
      }

      /**
       * @private
       * @returns {*}
       */
      function parseHistory () {
        var history = new ModelHistory();

        history.Center = new Point(
          //_this.editor.editor.graph.getGraphBounds().getCenterX(),
          _this.editor.editor.graph.view.translate.x,
          //_this.editor.editor.graph.getGraphBounds().getCenterY()
          _this.editor.editor.graph.view.translate.y
        );

        history.Scale = 1 / mxConstants.PIXELS_PER_MM;
        history.Unit = [null, 'pt', 'mm', 'inch', 'sm', 'm'][_this.editor.editor.graph.view.unit];
        history.ShowGrid = _this.editor.editor.graph.gridEnabled;
        history.GridScale = _this.editor.editor.graph.gridSize/_this.editor.editor.graph.view.gridSteps;
        history.SnapToGrid = _this.editor.editor.graph.gridEnabled;
        history.SnapToNearest = true;
        history.SnapStrength = 1;

        return history;
      }

      /**
       * @private
       * @param source
       * @returns {*}
       */
      function mapItems(source) {
        var mappedItems = null, layersRejected;

        layersRejected = _.reject(_this.editor.editor.graph.model.cells, function (cell) {
          return _this.editor.editor.graph.model.isLayer(cell) || _this.editor.editor.graph.model.isRoot(cell);
        });

        mappedItems = _.map(layersRejected, function (cell) {
          var item = new ModelItem(), cellStyles;

          cellStyles = parseCellStyle(cell.style)

          item.Uuid = cell.id;
          item.ClassName = cell.className;

          item.Font = new Font({
            Color: cellStyles.fontColor,
            FontName: cellStyles.fontFamily,
            Weight: cellStyles.fontStyle * 100 || 400,
            // Weight: cellStyles.fontSize,
            Bold: cellStyles.fontStyle === '7',
            Italic: false,
            Underline: false
          });

          item.Text = _.isObject(cell.value) && cell.getAttribute('label') || cell.value;
          item.Layer = cell.getParent().getId();
          item.Frame = new Frame(
            cell.geometry.x,
            cell.geometry.x + cell.geometry.width,
            cell.geometry.y,
            cell.geometry.y + cell.geometry.height
          );
          item.Angle = cellStyles.rotation || 0;
          item.FrontColor = cellStyles.strokeColor;
          item.BgColor = cellStyles.fillColor;

          item.PropValues = [];

          if(cell.value.attributes) {
            item.PropValues = _.toArray(cell.value.attributes);
            item.PropValues.shift();
            item.PropValues = _.map(item.PropValues, function(attr){
              var _attributeMap = {};
              _attributeMap[attr.name] = attr.value;

              return _attributeMap;
            });
          }

          return item;
        });


        return mappedItems;
      }

      model.BgColor = _this.editor.editor.graph.background || '#fff';
      model.History = parseHistory();
      model.Items = mapItems(gModel);

      return model;
    },

    /**
     * @param {String} uuid
     * @returns undefined
     * Назначение: Загружает чертеж для редактирования;
     * Действие:
       Обращается по к JS методу по адресу [BaseURL + GetPaletteUrl] и загружает палитру компонентов. HTTP метод: POST. Аргументы: нет. Результат вызова: массив объектов Component;
       Если GetPaletteUrl не задан, обращается к JS методу GetPaletteScript и загружает палитру компонентов. Аргументы вызова: нет. Результат вызова: массив объектов Component;
       Обращается по к JS методу по адресу [BaseURL + LoadModelUrl] и загружает чертеж. HTTP метод: POST. Аргументы: Uuid – uuid чертежа. Результат вызова - объект Model;
       Если LoadModelUrl не задан, обращается к JS методу LoadModelScript и загружает чертеж. Аргументы: Uuid – uuid чертежа. Результат вызова - объект Model;
     *
     */
    Load: function (uuid) {

    },

    /**
     * @param {String} uuid Uuid: строка. Идентификатор для нового чертежа;
     * @returns {undefined}
     * Назначение: Создает новый пустой чертеж;
     * Действие:
     Обращается по к JS методу по адресу [BaseURL + GetPaletteUrl] и загружает палитру компонентов. HTTP метод: POST. Аргументы: нет. Результат вызова: массив объектов Component;
     Если GetPaletteUrl не задан, обращается к JS методу GetPaletteScript и загружает палитру компонентов. Аргументы вызова: нет. Результат вызова: массив объектов Component;
     Очищает загруженную в редактора Model;
     *
     */
    New: function (uuid) {

    },

    /**
     * @returns {String} Uuid: строка. Идентификатор сохраненного чертежа;
     * Назначение: Загружает чертеж для редактирования;
     * Действие:
     Обращается по к JS методу по адресу [BaseURL + SaveModelUrl] и сохраняет чертеж. HTTP метод: POST. Аргументы: Model –чертеж, объект Model. Результат вызова: Uuid – uuid чертежа;
     Если GetModelUrl не задан, обращается к JS методу GetModelScript и сохраняет чертеж. Аргументы: Model –чертеж, объект Model. Результат вызова: Uuid – uuid чертежа;
     *
     */
    Save: function () {
      var data, pGraph;

      pGraph = _this.actions.parseGraph();

      data = {
        Model: pGraph
      };

      api('/save', 'POST', data);

    }
  }

}, topology;

