import React from 'react';
import {render} from 'react-snapshot';
import './index.css';
import BooleanFunctions from './boolean-functions';
import TruthTableSegments from './truth-table-segments';

/*ReactDOM.*/ render(
  <BooleanFunctions />,
  document.getElementById('react-boolean-functions')
);

render(
    <TruthTableSegments
      inputs={['a', 'b', 'c', 'd']}
      outputs={['A', 'B', 'C', 'D', 'E', 'F', 'G']}
      rowCount={10}
    />,
    document.getElementById('react-truth-table-segments')
);
