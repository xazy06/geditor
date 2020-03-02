(function(){
  function loadCss () {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'styles/grapheditor.css';
    head.appendChild(link);
  }

  function init () {
    loadCss();
  }

  init();

}());
