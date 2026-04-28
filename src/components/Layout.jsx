import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        {children}
      </div>
    </>
  );
};

export default Layout;