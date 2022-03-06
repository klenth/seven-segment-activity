import React from 'react';
import {render} from 'react-snapshot';
import './index.css';
import TruthTableSegments from './truth-table-segments';
import BooleanFunctions from './boolean-functions';
import OptimalFunctions from "./optimal-functions";

render(
    <TruthTableSegments
        inputs={['w', 'x', 'y', 'z']}
        outputs={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
        rowCount={10}
    />,
    document.getElementById('react-truth-table-segments')
);

render(
  <BooleanFunctions />,
  document.getElementById('react-boolean-functions')
);

render(
    <OptimalFunctions />,
    document.getElementById('react-optimal-functions')
);

