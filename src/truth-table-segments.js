import React from 'react';
import TruthTable from './truth-table';
import './truth-table-segments.css';
import DigitDisplay from "./digit-display";

export default class TruthTableSegments extends React.Component {
    constructor(props) {
        super(props);

        const slots = Array(10).fill(null);

        for (let i = 0; i < slots.length; ++i)
            slots[i] = Array(this.props.outputs.length).fill(null);

        this.state = {
            slots: slots,
        };
    }

    render() {
        return (
            <>
                <div className='digit-displays'>
                    <DigitDisplay value={0} bits={this.state.slots[0]} />
                    <DigitDisplay value={1} bits={this.state.slots[1]} />
                    <DigitDisplay value={2} bits={this.state.slots[2]} />
                    <DigitDisplay value={3} bits={this.state.slots[3]} />
                    <DigitDisplay value={4} bits={this.state.slots[4]} />
                    <DigitDisplay value={5} bits={this.state.slots[5]} />
                    <DigitDisplay value={6} bits={this.state.slots[6]} />
                    <DigitDisplay value={7} bits={this.state.slots[7]} />
                    <DigitDisplay value={8} bits={this.state.slots[8]} />
                    <DigitDisplay value={9} bits={this.state.slots[9]} />
                </div>

                <TruthTable
                    inputs={['w', 'x', 'y', 'z']}
                    outputs={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
                    rowCount={10}
                    slots={this.state.slots}
                    handleChange={(index, output, value) => this.handleChange(index, output, value)}
                />
            </>
        )
    }

    handleChange(index, output, value) {
        if (value !== '' && value !== '0' && value !== '1')
            return;

        console.log('Setting value (' + index + ', ' + output + ') to ' + value);
        if (value === '0')
            value = 0;
        else if (value === '1')
            value = 1;
        else
            value = null;

        const newSlots = this.state.slots.slice();
        newSlots[index] = newSlots[index].slice();
        newSlots[index][output] = value;

        this.setState({
            slots: newSlots,
        })
    }

}