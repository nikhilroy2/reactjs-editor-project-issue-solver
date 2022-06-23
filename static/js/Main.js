import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Core from './components/Core';
import Preloader from './components/Preloader';
import LockedTab from './components/LockedTab';
import HotJar from './components/HotJar';
import LockedMobile from './components/LockedMobile';
import Sidebar from './components/Sidebars';
import StyleComponents from './components/Core/Styles/Components';
import StyleBlocks from './components/Core/Styles/Blocks';
import StyleFonts from './components/Core/Styles/Fonts';
import { loadData } from './redux/actions/Preloader';

const Main = () => {
  const dispatch = useDispatch();
  const preLoader = useSelector((state) => state.preloader);
  const activePage = useSelector((state) => state.pages.activePage);
  const { isLoading, isLockedTab, isLockedMobile } = preLoader;

  const { page_id } = useParams();

  useEffect(() => {
    dispatch(loadData(page_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_id]);

  useEffect(() => {
    document.title = activePage && activePage.name ? `Editor / ${activePage.name}` : 'Editor';
  }, [activePage])

  if (!isLoading && isLockedMobile) {
    return <LockedMobile />;
  }
  if (!isLoading && isLockedTab) {
    return <LockedTab />;
  }
  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <div className="editor__main">
        <Sidebar />
        <Core />
        <StyleFonts />
        <StyleComponents />
        <StyleBlocks />
        <HotJar />
      </div>
    </>
  );
};

export default Main;
