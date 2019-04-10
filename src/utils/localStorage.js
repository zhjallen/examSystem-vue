export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key) || null);
};

export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const setItems = (...objects) => {
  objects.map(object => window.localStorage.setItem(object.key, JSON.stringify(object.value)));
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

export const removeItems = (...keys) => {
  keys.map(key => window.localStorage.removeItem(key));
};
