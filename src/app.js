import React from 'react';
import DigitDisplay from './digit-display';
import './app.css';
import SevenSegmentDisplay from "./seven-segment-display";
import TruthTableSegments from "./truth-table-segments";
import BooleanFunctions from "./boolean-functions";
import OptimalFunctions from "./optimal-functions";
import antlr4 from "antlr4";
import LogicLexer from "./jslogic/LogicLexer";
import LogicParser from "./jslogic/LogicParser";
import util from "./util";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            truthTableSlots: [...Array(16)].map(_ => Array(7).fill(null)),
            exprs: Array(7).fill(null),
            optimizedExprs: Array(7).fill(null),
        };
    }

    componentDidMount() {
        const nav_ul = document.querySelector("nav ul");
        // Watch document scrolls and highlight the link to the current
        // problem
        const problems = document.querySelectorAll(".problems > .problem");

        // Since some problems don't have links, we need to keep track of the mapping between problem index and link index!
        const problem_link_index_map = [ 0 ];

        let link_index = 1;

        for (let problem of document.querySelectorAll(".problems > .problem")) {
            problem_link_index_map.push(link_index);
            if (problem.querySelector(".title"))
                ++link_index;
        }

        let current_tab = null;
        let current_problem = -1;

        function updateCurrent() {
            const viewportHeight = document.querySelector("html").clientHeight;
            let new_current_problem = -1;
            for (let i = problems.length - 1; i >= 0; --i) {
                const client_rect = problems[i].getBoundingClientRect();
                if (client_rect.top < viewportHeight * 0.3) {
                    new_current_problem = i;
                    break;
                }
            }

            if (new_current_problem === -1 && problems.length > 0)
                new_current_problem = 0;

            const tabs = document.querySelectorAll("nav ul li");
            if (new_current_problem !== current_problem) {
                if (current_tab !== null)
                    current_tab.classList.remove("current");
                if (new_current_problem !== -1) {
                    let tab_index = problem_link_index_map[new_current_problem];
                    if (tab_index >= tabs.length) {
                        tab_index = tabs.length - 1;
                    }
                    current_tab = tabs[tab_index];
                    current_tab.classList.add("current");
                } else
                    current_tab = null;

                current_problem = new_current_problem;
            }
        }

        document.addEventListener("scroll", updateCurrent);

        const darkModeToggle = document.querySelector(".dark-mode-toggle");
        const html = document.querySelector("html");
        if (darkModeToggle) {
            darkModeToggle.addEventListener("click", () => {
                html.classList.toggle("dark-mode");
                localStorage.setItem("dark-mode", html.classList.contains("dark-mode") ? "yes" : "");
            });
        }

        if (localStorage.getItem("dark-mode"))
            document.querySelector("html").classList.add("dark-mode");

    }

    render() {
        return (
            <>
                <div
                    className='assignment-info'
                >
                    <h1>CMPT 328 — Hexadecimal seven segments</h1>

                    <p>
                        <a href="https://en.wikipedia.org/wiki/Seven-segment_display" target="_blank">Seven-segment displays</a> are
                        used in some simple electronics (such as microwaves, digital clocks, etc.), frequently to show
                        lengths of time and such. For example, below is a seven-segment display showing the digit 7:
                    </p>
                    <div className='centered'>
                        <SevenSegmentDisplay
                            state={[true, false, false, false, false, true, true]}
                        />
                    </div>

                    <p>
                        In a seven-segment display component, there are seven input wires, called a through g, each controlling whether one
                        of the seven segments is illuminated. Your task now is to extend the work you did for the digits
                        0-9 to produce an optimized circuit that can display any <em>hexadecimal</em> digit, 0-9 and A-F.
                    </p>

                    <p className="centered">
                        <img src='seven-segment-display-adapter.png' />
                    </p>

                    <p>
                        Specifically, you will have four Boolean inputs w, x, y, and z, representing the four bits of the number (0000
                        for 0 through 1111 for F). Using those, you will construct seven Boolean functions, one for each
                        segment of the display, so that the display shows each digit correctly.
                    </p>

                    <div className='total points'>50 points</div>
                </div>

                <div className={'problems'}>
                    <a id='truth-table'/>
                    <div className={'problem'}>
                        <div className='title'>Truth table</div>

                        <p>
                            Start by filling out a truth table for what the seven-segment display should show for each
                            digit. In this table, the four inputs (w, x, y, and z) are the four bits of the number — for
                            example, the number 5 (0101 in binary) would be the row w=0, x=1, y=0, z=1. The seven
                            outputs each represent one of the segments (called a through g) of the seven-segment
                            display. The truth table now has all 16 rows because any combination of the four input bits
                            is valid.
                        </p>

                        <p>
                            Fill in the truth table until you are satisfied with how each digit is displayed. (Note that
                            you will have to make some sort of compromise in how some of the digits are displayed — for
                            example, you might display B as a lowercase b, as otherwise it will look identical to an 8).
                            <br/>
                            <strong>All sixteen digits <em>must</em> look different from one another in your final table.</strong>
                        </p>

                        <TruthTableSegments
                            inputs={['w', 'x', 'y', 'z']}
                            outputs={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
                            rowCount={16}
                            slots={this.state.truthTableSlots}
                            handleChange={(index, output, value) => this.handleTruthTableSlotChange(index, output, value)}
                        />

                        <div className='total points'>20 points</div>
                    </div>

                    <a id='boolean-functions'/>
                    <div className='problem'>
                        <div className='title'>Boolean functions</div>

                        <p>
                            Now that you have a truth table for all seven segments, write Boolean functions to control
                            each of the seven segments. These correspond to what circuitry would be connected to each of
                            the seven-segment display’s seven inputs, and each can use the variables w, x, y, and z,
                            being the four bits of the digit to display.
                        </p>

                        <p>
                            For each of the seven segments, decide whether it would be better to use
                            SoP <code>_ _ _ + _ _ _ + _ _ _</code> or PoS <code>(_ + _ + _)(_ + _ + _)(_ + _ +
                            _)</code> form, then write a function implementing the truth table you filled in above.
                            Don’t worry about Karnaugh mapping it just yet; that’s the next step!
                        </p>

                        <BooleanFunctions
                            exprs={this.state.exprs}
                            handleChange={(box, i) => this.handleBooleanFunctionChange(this.state.exprs, box, i)}
                            referenceSlots={this.state.truthTableSlots}
                        />

                        <div className='total points'>20 points</div>
                    </div>

                    <a id='optimization'/>
                    <div className='problem'>
                        <div className='title'>Optimization</div>

                        <p>
                            Use Karnaugh maps to derive <em>optimal</em> SoP or PoS functions, using as few logic gates (and hence transistors) as possible. Fill in the table below, which will show you how many transistors are used in total by your functions. The functions you wrote above are automatically included in the table; you only need to fill in the <em>(optimized)</em> ones.
                        </p>

                        <p>
                            Since all sixteen input bit patterns are now valid, there won’t be any “don't care” bits; you will need to implement each of the seven functions precisely.
                        </p>

                        <OptimalFunctions
                            exprs={this.state.optimizedExprs}
                            originalExprs={this.state.exprs}
                            handleChange={(box, i) => this.handleBooleanFunctionChange(this.state.optimizedExprs, box, i)}
                            referenceSlots={this.state.truthTableSlots}
                        />

                        <div className='total points'>10 points</div>
                    </div>
                </div>
            </>
        );
    }

    handleTruthTableSlotChange(index, output, value) {
        if (value !== '' && value !== '0' && value !== '1')
            return;

        if (value === '0')
            value = 0;
        else if (value === '1')
            value = 1;
        else
            value = null;

        const newSlots = this.state.truthTableSlots.slice();
        newSlots[index] = newSlots[index].slice();
        newSlots[index][output] = value;

        this.setState({
            ...this.state,
            truthTableSlots: newSlots,
        });
    }

    handleBooleanFunctionChange(exprs, box, index) {
        const text = box.value;

        let newExpr = {};

        let valid = true;

        if (text) {
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

                newExpr.ast = parser.func().n;

                const vars = newExpr.ast.getVars();
                for (let v of vars) {
                    if (v !== 'w' && v !== 'x' && v !== 'y' && v !== 'z')
                        valid = false;
                }
            } catch {
                valid = false;
            }
        }

        if (!valid)
            newExpr.ast = undefined;
        newExpr.text = text;

        const newExprs = exprs.slice();
        newExprs[index] = newExpr;
        const newState = Object.assign({}, this.state);

        if (exprs === this.state.exprs)
            newState.exprs = newExprs;
        else if (exprs === this.state.optimizedExprs)
            newState.optimizedExprs = newExprs;

        this.setState(newState);
    }
}
