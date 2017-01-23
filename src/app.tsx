import * as React from 'react';
import {render} from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'
import RootRouter from './routing';

render(<RootRouter/>, document.getElementById('app'))
