import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Step1 from "./pages/step1";
import Step2 from "./pages/step2";
import Step3 from "./pages/step3";
import Step4 from "./pages/step4";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Step1></Step1>,
      },
      {
        path: "step2",
        element: <Step2></Step2>,
      },
      {
        path: "step3",
        element: <Step3></Step3>,
      },
      {
        path: "step4",
        element: <Step4></Step4>,
      },
    ],
  },
]);

export default router;
