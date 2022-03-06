import React from 'react';
import './truth-table.css';

export default class TruthTable extends React.Component {
    rowCount() {
        if ('rowCount' in this.props)
            return this.props.rowCount;
        return 1 << this.props.inputs.length;
    }

    render() {
        const numbers = Array(this.rowCount());
        for (let i = 0; i < numbers.length; ++i)
            numbers[i] = i;

        const inputHeader = this.props.inputs.map((input, i) => {
            let className = '';
            if (i + 1 === this.props.inputs.length)
                className = 'last-input';
            return (
                <th
                    key={i}
                    className={className} scope='col'
                >{input}</th>
            );
        });

        const outputHeader = this.props.outputs.map((output, i) => {
            let className = '';
            if (i === 0)
                className = 'first-output';
            return (
                <th
                    key={i + this.props.inputs.length}
                    className={className} scope='col'
                >{output}</th>
            );
        });

        const rows = numbers.map(n => (
                <Row
                    key={n}
                    index={n}
                    inputs={this.props.inputs}
                    outputs={this.props.outputs}
                    values={this.props.slots[n]}
                    handleChange={(o, value) => this.props.handleChange(n, o, value)}
                />
            )
        );

        return (
            <table className='truth-table'>
                <thead>
                    <tr>
                        {inputHeader}
                        {outputHeader}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

function Row(props) {
    const inputColumns = Array(props.inputs.length);
    const n = props.index;
    for (let i = 0; i < inputColumns.length; ++i) {
        let className = 'input';
        if (i + 1 === inputColumns.length)
            className += ' last-input';
        inputColumns[i] = (
            <td
                key={i}
                className={className}
            >
                {(n >> (inputColumns.length - i - 1)) & 1}
            </td>
        );
    }

    const outputColumns = Array(props.outputs.length);
    for (let i = 0; i < outputColumns.length; ++i) {
        let className = 'output';
        if (i === 0)
            className += ' first-output';
        outputColumns[i] = (
            <td
                key={i + props.inputs.length}
                className={className}
            >
                <input
                    type='text'
                    value={(props.values[i] === null) ? '' : ('' + props.values[i])}
                    onChange={e => props.handleChange(i, e.target.value)}
                    //tabIndex={(1 << props.inputs.length) * i + props.index + 1}
                />
            </td>
        );
    }

    return (
        <tr className='truth-table-row'>
            {inputColumns}
            {outputColumns}
        </tr>
    )
}