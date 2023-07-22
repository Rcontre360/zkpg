import React from "react";

const Layout: React.FunctionComponent<{}> = ({children}) => {
  return (
    <div className={`bg-black w-full text-white`} style={{height: "100%"}}>
      <div className="flex font-montserrat flex">
        <div className={`w-full md:px-20 sm:px-40 pt-8`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
