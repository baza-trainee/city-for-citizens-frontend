import Footer from '../components/common/footer';
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
