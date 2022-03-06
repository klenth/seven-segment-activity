import React from 'react';
import antlr4 from 'antlr4';
import LogicLexer from './jslogic/LogicLexer';
import LogicParser from './jslogic/LogicParser';
import DigitDisplay from './digit-display';
import AST from './jslogic/ast';
import './optimal-functions.css';

class OptimalFunctions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exprs:  Array(7).fill(null),
        };
    }

    render() {
        const varNames = ['w', 'x', 'y', 'z'];
        const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

        const rowClasses = Array(7).fill(null);
        this.state.exprs.forEach((expr, i) => {
            if (expr === undefined)
                rowClasses[i] = 'invalid';
        });

        const transistorCounts = [...Array(7).keys()].map(i => this.transistorsUsed(this.state.exprs[i]));
        const totalTransistorCount = transistorCounts.reduce((a, b) => a + b, 0);

        const rows = Array(7).fill(0).map((_, i) => (
            <tr
                key={i}
                className={rowClasses[i]}
            >
                <td>{segmentNames[i]}</td>
                <td className={'expression'}>
                    <input
                        type={'text'}
                        onChange={(e) => this.handleChange(e.target, i)}
                    />
                </td>
                <td className={'transistors'}>
                    {transistorCounts[i]}
                </td>
            </tr>
        ));

        return (<>
            <div className='digit-displays'>
                <DigitDisplay value={0} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={1} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={2} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={3} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={4} exprs={this.state.exprs} variableNames={varNames} />
                <br/>
                <DigitDisplay value={5} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={6} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={7} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={8} exprs={this.state.exprs} variableNames={varNames} />
                <DigitDisplay value={9} exprs={this.state.exprs} variableNames={varNames} />
            </div>

            <p>
                Write Boolean expressions for each segment so that they correctly show each digit above.
            </p>

            <table className={'optimal-functions'}>
                <thead>
                <tr>
                    <th scope='col'>Segment</th>
                    <th scope='col'>Function</th>
                    <th scope='col'>Transistors needed</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr className={'total-transistors'}>
                        <td/>
                        <td/>
                        <td className={'transistors'}>
                            Total: {totalTransistorCount}
                        </td>
                    </tr>
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

        const newExprs = this.state.exprs.slice();
        newExprs[index] = newExpr;
        this.setState({
            exprs: newExprs,
        });
    }

    transistorsUsed(expr) {
        if (!expr)
            return null;

        const invertedVariables = new Set();
        let transistorCount = 0;

        let countBinaryOp;

        let count = node => {
            if (node instanceof AST.NotNode) {
                if (node.child instanceof AST.VarNode)
                    invertedVariables.add(node.child.varName);
                else if (node.child instanceof AST.AndNode || node.child instanceof AST.OrNode || node.child instanceof AST.XorNode) {
                    const numArgs = 2 + countBinaryOp(node.child.op, node.child.left) + countBinaryOp(node.child.right);
                    if (node instanceof AST.XorNode)
                        transistorCount += 3 * numArgs - 3;
                    else
                        transistorCount += numArgs;
                } else {
                    ++transistorCount;
                    count(node.child);
                }
            } else if (node instanceof AST.AndNode || node instanceof AST.OrNode || node instanceof AST.XorNode) {
                const numArgs = 2 + countBinaryOp(node.op, node.left) + countBinaryOp(node.op, node.right);
                if (node instanceof AST.XorNode)
                    transistorCount += 3 * numArgs - 1;
                else
                    transistorCount += 2 * numArgs - 1;
            }
        };

        countBinaryOp = (op, node) => {
            if ((node instanceof AST.AndNode || node instanceof AST.OrNode || node instanceof AST.XorNode) && node.op === op) {
                return 1 + countBinaryOp(op, node.left) + countBinaryOp(op, node.right);
            } else {
                count(node);
                return 0;
            }
        };

        count(expr);

        console.log(invertedVariables);

        transistorCount += invertedVariables.size;

        return transistorCount;
    }
}

export default OptimalFunctions;
