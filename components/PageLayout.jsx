'use client';

import Footer from './Footer';
import Header from './header/Header';

const PageLayout = ({ children }) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default PageLayout;
