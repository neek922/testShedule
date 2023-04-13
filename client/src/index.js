import React from 'react';
import { render } from 'react-dom';
import App from "./App";
import { Provider as StoreProvider} from './store';





render(<StoreProvider><App /></StoreProvider>, document.getElementById('root'));
