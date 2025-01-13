import React from 'react';
import ReactDom from 'react-dom';

type BackgroundPortalProps = {
  children: React.ReactNode;
};

const BackgroundPortal = ({ children }: BackgroundPortalProps) => {
  const el = document.getElementById('background-root') as HTMLElement; // 타입 단언 사용
  return ReactDom.createPortal(children, el);
};

export default BackgroundPortal;
