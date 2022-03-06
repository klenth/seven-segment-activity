import React from 'react';
import antlr4 from 'antlr4';
import LogicLexer from './jslogic/LogicLexer';
import LogicParser from './jslogic/LogicParser';
import DigitDisplay from './digit-display';
import './boolean-functions.css';

class BooleanFunctions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exprs:  Array(7).fill(null),
        };
    }
    
    render() {
        return (<>
            <div className='digit-displays'>
                <DigitDisplay value={0} exprs={this.state.exprs} />
                <DigitDisplay value={1} exprs={this.state.exprs} />
                <DigitDisplay value={2} exprs={this.state.exprs} />
                <DigitDisplay value={3} exprs={this.state.exprs} />
                <DigitDisplay value={4} exprs={this.state.exprs} />
                <DigitDisplay value={5} exprs={this.state.exprs} />
                <DigitDisplay value={6} exprs={this.state.exprs} />
                <DigitDisplay value={7} exprs={this.state.exprs} />
                <DigitDisplay value={8} exprs={this.state.exprs} />
                <DigitDisplay value={9} exprs={this.state.exprs} />
            </div>
            
            <p>
                Write Boolean expressions for each segment so that they correctly show each digit above.
            </p>
            
            <table>
                <tbody>
                    <tr>
                        <th scope="row">Boolean expressions:</th>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 0)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 1)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 2)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 3)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 4)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 5)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                onChange={(e) => this.handleChange(e.target, 6)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>);
    }
    
    handleChange(box, index) {
        const text = box.value;
        
        let newExpr = null;
        
        try {
            const chars = new antlr4.InputStream(text);
            const lexer = new LogicLexer(chars);
            const tokens = new antlr4.CommonTokenStream(lexer);
            const parser = new LogicParser(tokens);
            
            parser.removeErrorListeners();
            
            newExpr = parser.func().n;
        } catch {
            // Do nothing
        }
            
        const newExprs = this.state.exprs.slice();
        newExprs[index] = newExpr;
        this.setState({
            exprs: newExprs,
        });
    }
}

export default BooleanFunctions;
