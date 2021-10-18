import { useState, useEffect } from 'react';
import Box from '../src/components/contentbox/Box';
import View from '../src/components/contentbox/View';

const seprator = '@@_@_@@';

export default function Screen() {
  const [state, setState] = useState({
    pageHTML: '',
    mainCss: '',
    sectionCss: '',
    edit: true,
    init: false,
  });

  useEffect(() => {
    let sPageHTML = '';
    let sMainCss = '';
    let sSectionCss = '';
    if (localStorage.getItem('contentBoxValue') != null) {
      let value: any = localStorage.getItem('contentBoxValue');
      value = value.split(seprator);
      // console.log(value);
      sPageHTML = value[0];
      sMainCss = value[1];
      sSectionCss = value[2];
    }

    setState({
      ...state,
      pageHTML: sPageHTML,
      mainCss: sMainCss,
      sectionCss: sSectionCss,
      init: true,
    });
  }, []);

  const onSave = (sPageHTML, sMainCss, sSectionCss) => {
    const value = `${sPageHTML}${seprator}${sMainCss}${seprator}${sSectionCss}`;
    localStorage.setItem('contentBoxValue', value);
    setState({
      ...state,
      pageHTML: sPageHTML,
      mainCss: sMainCss,
      sectionCss: sSectionCss,
    });
  };

  if (state.init) {
    if (state.edit) {
      return (
        <Box
          onClose={() => setState({ ...state, edit: false })}
          onSave={onSave}
          pageHTML={state.pageHTML}
          mainCss={state.mainCss}
          sectionCss={state.sectionCss}
        />
      );
    } else {
      return (
        <View
          onClickEdit={() => setState({ ...state, edit: true })}
          pageHTML={state.pageHTML}
          mainCss={state.mainCss}
          sectionCss={state.sectionCss}
        />
      );
    }
  } else {
    return <p>loading...</p>;
  }
}
