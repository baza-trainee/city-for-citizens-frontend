import Footer from '../components/footer/footer';
import Header from './header/Header';

const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default PageLayout;
