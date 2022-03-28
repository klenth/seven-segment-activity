import React from 'react';
import TruthTable from './truth-table';
import './truth-table-segments.css';
import util from './util';
import DigitDisplay from "./digit-display";

export default class TruthTableSegments extends React.Component {
    constructor(props) {
        super(props);

        /*const slots = Array(10).fill(null);

        for (let i = 0; i < slots.length; ++i)
            slots[i] = Array(this.props.outputs.length).fill(null);

        this.state = {
            slots: slots,
        };*/
    }

    render() {
        return (
            <>
                <div className='digit-displays'>
                    <DigitDisplay value={0} bits={this.props.slots[0]} />
                    <DigitDisplay value={1} bits={this.props.slots[1]} />
                    <DigitDisplay value={2} bits={this.props.slots[2]} />
                    <DigitDisplay value={3} bits={this.props.slots[3]} />
                    <DigitDisplay value={4} bits={this.props.slots[4]} />
                    <br/>
                    <DigitDisplay value={5} bits={this.props.slots[5]} />
                    <DigitDisplay value={6} bits={this.props.slots[6]} />
                    <DigitDisplay value={7} bits={this.props.slots[7]} />
                    <DigitDisplay value={8} bits={this.props.slots[8]} />
                    <DigitDisplay value={9} bits={this.props.slots[9]} />
                </div>

                <div className={'truth-table-wrapper'}>
                    <TruthTable
                        inputs={['w', 'x', 'y', 'z']}
                        outputs={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
                        rowCount={10}
                        slots={this.props.slots}
                        handleChange={(index, output, value) => this.props.handleChange(index, output, value)}
                    />

                    <div className={'clipboard-controls'}>
                        <button
                            onClick={() => this.handleCopy()}
                        >Copy table</button>
                    </div>
                </div>
            </>
        )
    }

    /*
    handleChange(index, output, value) {
        if (value !== '' && value !== '0' && value !== '1')
            return;

        if (value === '0')
            value = 0;
        else if (value === '1')
            value = 1;
        else
            value = null;

        const newSlots = this.props.slots.slice();
        newSlots[index] = newSlots[index].slice();
        newSlots[index][output] = value;

        this.setState({
            slots: newSlots,
        })
    }
    */

    handleCopy() {
        /*
        // Encode each row as a base-3 number (0=0, 1=1, 2=null)
        const rows = [...Array(10).keys()].map(i => {
            let value = 0;
            for (let j = 0; j < this.props.slots[i].length; ++j) {
                let d = (this.props.slots[i][j] === null) ? 2 : this.props.slots[i][j];
                value = 3 * value + d;
            }
            return value;
        });
        const data = util.encode(rows);
        */

        const csv = util.join('\n', [...Array(10).keys()].map(i => {
            return util.join('\t', this.props.slots[i].map(s => (s === null) ? '' : '' + s));
        }));

        navigator.clipboard.writeText(csv);
    }

    handlePaste() {
        /*
        const pastedText = document.getElementById('truth-table-paste-box').value;
        const data = util.decode(pastedText);

        if (!(data instanceof Array) || data.length !== this.props.slots.length)
            console.warn("Invalid pasted data");
        else {
            const newSlots = this.props.slots.slice();
            for (let i = 0; i < data.length; ++i) {
                newSlots[i] = newSlots[i].slice();
                let value = parseInt(data[i]);
                for (let j = this.props.slots[i].length - 1; j >= 0; --j) {
                    const d = value % 3;
                    newSlots[i][j] = (d === 2) ? null : d;
                    value = util.integer_quotient(value, 3);
                }
            }

            const newState = Object.assign({}, this.state);
            newState.slots = newSlots;
            this.setState(newState);
        }
        */

        const textarea = document.createElement("textarea");
        textarea.style.position = 'fixed';
        textarea.style.left = '0';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        document.execCommand('paste');
        const data = textarea.innerText;
        console.log(data);
        //document.body.removeChild(textarea);
    }
}
