import React from 'react';
import ReactDOM from 'react-dom';
import { HandTracker } from './HandTracker/HandTracker.tsx';

const App = () => {
   return (
      <div>
         <h1>Hello, React!</h1>
         <HandTracker/>
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById('root'));



