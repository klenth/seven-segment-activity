import React from 'react';
import './seven-segment-display.css';

class SevenSegmentDisplay extends React.Component {
    
    render() {
        const s = this.props.state || Array(7).fill(null);
        return (
            <div className='seven-segment-display'>
                <Segment direction='h' x={0} y={0} on={s[0]} />
                <Segment direction='h' x={0} y={1} on={s[1]} />
                <Segment direction='h' x={0} y={2} on={s[2]} />
                <Segment direction='v' x={0} y={0} on={s[3]} />
                <Segment direction='v' x={0} y={1} on={s[4]} />
                <Segment direction='v' x={1} y={0} on={s[5]} />
                <Segment direction='v' x={1} y={1} on={s[6]} />
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
