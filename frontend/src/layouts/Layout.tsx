import Footer from "../components/Footer";
import Header from "../components/Header";
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <Header />
      <div className="flex-1 ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
