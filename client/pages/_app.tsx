import "tailwindcss/tailwind.css";
import "shared/css/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {wrapper} from "../redux/store";
import {Provider} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

import Layout from "../shared/layout";

const P = Provider as any;

function MyApp({Component, ...rest}) {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <P store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </LocalizationProvider>
    </P>
  );
}

export default MyApp;
