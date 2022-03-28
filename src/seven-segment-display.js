import React from 'react';
import './seven-segment-display.css';

class SevenSegmentDisplay extends React.Component {
    
    render() {
        const s = this.props.state || Array(7).fill(null);
        const r = this.props.reference || Array(7).fill(null);

        const inc = [...Array(7)].map((_, i) => r[i] !== null && s[i] !== r[i]);

        return (
            <div className='seven-segment-display'>
                <Segment direction='h' x={0} y={0} on={s[0]} inconsistent={inc[0]} />
                <Segment direction='h' x={0} y={1} on={s[1]} inconsistent={inc[1]} />
                <Segment direction='h' x={0} y={2} on={s[2]} inconsistent={inc[2]} />
                <Segment direction='v' x={0} y={0} on={s[3]} inconsistent={inc[3]} />
                <Segment direction='v' x={0} y={1} on={s[4]} inconsistent={inc[4]} />
                <Segment direction='v' x={1} y={0} on={s[5]} inconsistent={inc[5]} />
                <Segment direction='v' x={1} y={1} on={s[6]} inconsistent={inc[6]} />
            </div>
        );
    }
}

function Segment(props) {
    let className = 'segment';
    if (props.direction === 'v')
        className += ' vertical';
    else
        className += ' horizontal';
    if (props.inconsistent)
        className += ' inconsistent';

    className += ' x-' + props.x + ' y-' + props.y;
    if (props.on)
        className += ' on';
    
    return (
        <div className={className}>
            <div className='bar' />
        </div>
    );
}

export default SevenSegmentDisplay;
