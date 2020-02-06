/**
 * Компонент, предназначении для использования в качестве элемента чертежа
 */
var Component = function (model) {

  model = model || {};

  // String
  this.DisplayName = model.DisplayName;

  //String
  this.ClassName = model.DisplayName;

  //String
  this.GroupName = model.DisplayName;

  //Frame
  this.Frame = new Frame(model.Frame);

  //Shape[]
  this.Grahics = _.map(model.Grahics || [], function(graphics){
    return new Shape(graphics);
  });

  //Frame
  this.DefaultSize = new Frame(model.DefaultSize);

  //Frame
  this.MinSize = new Frame(model.MinSize);

  //Frame
  this.MaxSize = new Frame(model.MaxSize);

  //String
  this.DefaultText = model.DefaultText;

  //ObjectProp[]
  this.Properties = _.map(model.Properties || [], function(prop){
    return new ObjectProp(prop);
  });

  //ExternalMethod
  this.OnDblClick = model.OnDblClick || new ExternalMethod();

  //ExternalMethod
  this.OnChange = model.OnChange || new ExternalMethod();
};
