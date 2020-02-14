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
          _this.editor.graph.view.translate.x,
          //_this.editor.editor.graph.getGraphBounds().getCenterY()
          _this.editor.graph.view.translate.y
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
            // Weight: cellStyles.fontStyle * 100 || 400,
            Weight: cellStyles.fontSize,
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
      var data;

      data = {
        Model: _this.actions.parseGraph()
      };

      api('/save', 'POST', data);

    }
  }

}, topology;

