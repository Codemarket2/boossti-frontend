export const seprator = '@@_@_@@';

export const getSepratorValue = (value) => {
  let pageHTML = '';
  let mainCss = '';
  let sectionCss = '';
  let valueArray = value.split(seprator);
  if (valueArray && valueArray.length > 0) {
    pageHTML = valueArray[0];
    mainCss = valueArray[1];
    sectionCss = valueArray[2];
  }
  return {
    pageHTML,
    mainCss,
    sectionCss,
  };
};
