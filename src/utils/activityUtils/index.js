let component;

function setComponent(componentRef) {
  component = componentRef;
}

function loading(message, params) {
  return component.loading(message, params);
}

function success(message, params) {
  return component.success(message, params);
}

function error(message, params) {
  return component.error(message, params);
}

function hide() {
  return component.hide();
}

const activity = {
  setComponent,
  loading,
  success,
  error,
  hide
};

export default activity;
