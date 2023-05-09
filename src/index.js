import React from "react";
import ReactDOM from "react-dom/client";
import { HandTracker } from "./HandTracker/HandTracker";


const App = () => {
   return (
      <div>
         <h1>Hello, React!</h1>
         <HandTracker />
      </div>
   );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);


