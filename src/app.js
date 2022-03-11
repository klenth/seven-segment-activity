import React from 'react';
import DigitDisplay from './digit-display';
import './app.css';
import SevenSegmentDisplay from "./seven-segment-display";
import TruthTableSegments from "./truth-table-segments";
import BooleanFunctions from "./boolean-functions";
import OptimalFunctions from "./optimal-functions";

export default class App extends React.Component {
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
    }

    render() {
        return (
            <>
                <div
                    className='assignment-info'
                >
                    <h1>CMPT 328 — Activity 3.1</h1>

                    <p>
                        <a href="https://en.wikipedia.org/wiki/Seven-segment_display">Seven-segment displays</a> are
                        used in some simple electronics (such as microwaves, digital clocks, etc.), frequently to show
                        lengths of time and such. For example, below is a seven-segment display showing the digit 7:
                    </p>
                    <div className='centered'>
                        <SevenSegmentDisplay
                            state={[true, false, false, false, false, true, true]}
                        />
                    </div>

                    <p>
                        In a seven-segment display component, there are seven input wires, each controlling whether one
                        of the seven segments is illuminated. Your task in this activity is to determine a Boolean
                        function for each of those seven input wires so that the display correctly shows each of the 10
                        digits, 0 through 9.
                    </p>

                    <p className="centered">
                        <img src='../public/seven-segment-display-adapter.png' />
                    </p>

                    <p>
                        Specifically, you will have four Boolean inputs representing the four bits of the number (0000
                        for 0 through 1001 for 9). Using those, you will construct seven Boolean functions, one for each
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
                            display. The truth table has only 10 rows because these are the only rows we care about: it
                            is assumed that we will never be passed a value greater than 9.
                        </p>

                        <p>
                            Experiment with filling in the truth table and seeing which segments get illuminated as you
                            put in ones. (Blanks are the same as zeros for purposes of this table.) Once you get the
                            hang of it, work with your team on filling in the truth table until you are all satisfied
                            with how each digit is displayed.
                        </p>

                        <TruthTableSegments
                            inputs={['w', 'x', 'y', 'z']}
                            outputs={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
                            rowCount={10}
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
                            For each of the seven segments, decide as a team whether it would be better to use
                            SoP <code>_ _ _ + _ _ _ + _ _ _</code> or PoS <code>(_ + _ + _)(_ + _ + _)(_ + _ +
                            _)</code> form, then write a function implementing the truth table you filled in above.
                            Don’t worry about Karnaugh mapping it just yet; that’s the next step!
                        </p>

                        <BooleanFunctions/>

                        <div className='total points'>20 points</div>
                    </div>

                    <a id='optimization'/>
                    <div className='problem'>
                        <div className='title'>Optimization</div>

                        <p>
                            Use Karnaugh maps to derive <em>optimal</em> SoP or PoS functions, using as few logic gates (and hence transistors) as possible. Fill in the table below, which will show you how many transistors are used in total by your functions.
                        </p>

                        <p>
                            Since we don’t care what the seven-segment display would do for inputs greater than 9, you can (and should!) treat the six rows of the truth table corresponding to 10–16 as “don’t-care” values, allowed to be either 0 or 1, which can allow you to produce better (simpler) functions.
                        </p>

                        <OptimalFunctions/>

                        <div className='total points'>10 points</div>
                    </div>
                </div>
            </>
        );
    }
}
