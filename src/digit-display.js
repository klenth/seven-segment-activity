import React from 'react';
import SevenSegmentDisplay from './seven-segment-display';
import './digit-display.css';

export default class DigitDisplay extends React.Component {
    
    render() {
        return (
            <div className='digit-display'>
                <SevenSegmentDisplay state={this.states()} reference={this.props.reference} />
                <div className='digit'>
                    {this.props.value} <br/>
                    <div className='binary'>
                        wxyz
                        <br />
                        {this.binary(this.props.value)}
                    </div>
                </div>
            </div>
        );
    }
    
    states() {
        if ('bits' in this.props)
            return this.props.bits;
        else if ('exprs' in this.props)
            return this.props.exprs.map(e =>  e && this.stateFor(e, this.props.value));
        else
            return undefined;
    }
    
    stateFor(expr, n) {
        const a = (n >> 3) & 1,
              b = (n >> 2) & 1,
              c = (n >> 1) & 1,
              d = n & 1;
        const varNames = this.props.variableNames;

        if (varNames === undefined)
            throw "If props.exprs is given, then props.variableNames must be too!";

        if (varNames.length !== 4)
            throw "props.variableNames be an array of exactly four elements!";

        try {
            const vars = {};
            vars[varNames[0]] = a;
            vars[varNames[1]] = b;
            vars[varNames[2]] = c;
            vars[varNames[3]] = d;
            return expr.evaluate(vars);
        } catch {
            return null;
        }
    }
    
    binary(n) {
        return "" + ((n >> 3) & 1) + ((n >> 2) & 1) + ((n >> 1) & 1) + (n & 1);
    }
}
