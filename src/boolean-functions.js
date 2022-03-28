import React from 'react';
import antlr4 from 'antlr4';
import LogicLexer from './jslogic/LogicLexer';
import LogicParser from './jslogic/LogicParser';
import DigitDisplay from './digit-display';
import './boolean-functions.css';

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
        </>);
    }
    
    handleChange(box, index) {
        const text = box.value;
        
        let newExpr = null;

        let valid = true;

        if (text !== '') {
            try {
                const chars = new antlr4.InputStream(text);
                const lexer = new LogicLexer(chars);
                const tokens = new antlr4.CommonTokenStream(lexer);
                const parser = new LogicParser(tokens);

                const errorListener = {
                    syntaxError: (recognizer, token, line, column, message, error) => {
                        valid = false;
                    },
                    reportAmbiguity: (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) => {
                        valid = false;
                    },
                    reportAttemptingFullContext: (recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) => {
                        valid = false;
                    },
                    reportContextSensitivity: (recognizer, dfa, startIndex, stopIndex, prediction, configs) => {
                        valid = false;
                    },
                };

                lexer.removeErrorListeners();
                parser.removeErrorListeners();
                lexer.addErrorListener(errorListener);
                parser.addErrorListener(errorListener);

                newExpr = parser.func().n;
                const vars = newExpr.getVars();
                for (let v of vars) {
                    if (v !== 'w' && v !== 'x' && v !== 'y' && v !== 'z')
                        valid = false;
                }
            } catch {
                valid = false;
            }
        }

        if (!valid)
            newExpr = undefined;

        const newExprs = this.props.exprs.slice();
        newExprs[index] = newExpr;
        this.setState({
            exprs: newExprs,
        });
    }
}

export default BooleanFunctions;
