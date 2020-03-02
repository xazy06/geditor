// Extends EditorUi to update I/O action states based on availability of backend
(function () {
  var editorUiInit = EditorUi.prototype.init;

  EditorUi.prototype.init = function () {
    editorUiInit.apply(this, arguments);
    this.actions.get('export').setEnabled(false);

    // Updates action states which require a backend
    if (!Editor.useLocalStorage) {
      mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
        var enabled = req.getStatus() !== 404;
        this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
        this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
        this.actions.get('save').setEnabled(enabled);
        this.actions.get('saveAs').setEnabled(false);
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

    window.topology = new Topology();

    window['New'] = topology.actions.New;
    window['Load'] = topology.actions.Load;

    window.topology.editor = main;

  }, function () {
    document.body.innerHTML = '<div style="margin:10% auto 0;">Error loading resource files. Please check browser console.</div>';
  });
})();
