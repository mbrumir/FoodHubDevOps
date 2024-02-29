import React from 'react';
import './PinsLegend.css';

function PinsLegend() {
    return (
        <div className="pins-legend">
            <div className="pins-legend__pin">
                <div className="pins-legend__pin--icon ksiazulo"></div>
                <span className="pins-legend__pin--label">Książulo</span>
            </div>
            <div className="pins-legend__pin">
                <div className="pins-legend__pin--icon wojek"></div>
                <span className="pins-legend__pin--label">Wojek</span>
            </div>
        </div>
    )
}

export default PinsLegend;
