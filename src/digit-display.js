import React from 'react';
import SevenSegmentDisplay from './seven-segment-display';
import './digit-display.css';

export default class DigitDisplay extends React.Component {
    
    render() {
        return (
            <div className='digit-display'>
                <SevenSegmentDisplay state={this.states()} />
                <div className='digit'>
                    {this.props.value} <br/>
                    <div className='binary'>
                        abcd
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
        try {
            return expr.evaluate({
                a: a,
                b: b,
                c: c,
                d: d,
            });
        } catch {
            return null;
        }
    }
    
    binary(n) {
        return "" + ((n >> 3) & 1) + ((n >> 2) & 1) + ((n >> 1) & 1) + (n & 1);
    }
}
