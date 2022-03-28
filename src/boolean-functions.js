import React from 'react';
import antlr4 from 'antlr4';
import LogicLexer from './jslogic/LogicLexer';
import LogicParser from './jslogic/LogicParser';
import DigitDisplay from './digit-display';
import './boolean-functions.css';
import util from "./util";

class BooleanFunctions extends React.Component {
    render() {
        const varNames = ['w', 'x', 'y', 'z'];
        const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

        const rowClasses = Array(7).fill(null);
        this.props.exprs.forEach((expr, i) => {
            if (expr === undefined)
                rowClasses[i] = 'invalid';
        });

        const rows = Array(7).fill(0).map((_, i) => (
            <tr
                key={i}
                className={rowClasses[i]}
            >
                <td>{segmentNames[i]}</td>
                <td className={'expression'}>
                    <input
                        type={'text'}
                        value={this.props.exprs[i] && this.props.exprs[i].text || ''}
                        onChange={(e) => this.props.handleChange(e.target, i)}
                    />
                </td>
            </tr>
        ));

        return (<>
            <div className='digit-displays'>
                <DigitDisplay value={0} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[0]} />
                <DigitDisplay value={1} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[1]} />
                <DigitDisplay value={2} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[2]} />
                <DigitDisplay value={3} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[3]} />
                <DigitDisplay value={4} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[4]} />
                <br/>
                <DigitDisplay value={5} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[5]} />
                <DigitDisplay value={6} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[6]} />
                <DigitDisplay value={7} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[7]} />
                <DigitDisplay value={8} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[8]} />
                <DigitDisplay value={9} exprs={this.props.exprs} variableNames={varNames} reference={this.props.referenceSlots[9]} />
            </div>
            
            <p>
                Write Boolean expressions for each segment so that they correctly show each digit above.
            </p>

            <div className={'boolean-functions-table-wrapper'}>
                <table className={'boolean-functions'}>
                    <thead>
                        <tr>
                            <th scope='col'>Segment</th>
                            <th scope='col'>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <div className={'clipboard-controls'}>
                    <button onClick={_ => this.handleCopy()}>
                        Copy table
                    </button>
                </div>
            </div>
        </>);
    }

    handleCopy() {
        const csv = util.join('\n', [...Array(7).keys()].map(i => this.props.exprs[i].text));
        navigator.clipboard.writeText(csv);
    }
}

export default BooleanFunctions;
