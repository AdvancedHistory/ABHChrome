import React, {FC} from "react";
import "./bar.css";

const Bar: FC<{active:number,update:(arg0:number)=>void}> = ({active,update}) => {

    const selected = {
        backgroundColor: 'var(--alt)',
        color:  'var(--back)',
    };
    const not_selected = {
        color:  'var(--alt)',
    };

    const clicked = (value:number) => {
        update(value);
    }

    return (
        <div className="bar">
            <div id="history" className="bar_item">
                <div style={active===0?selected:not_selected} onClick={() => clicked(0)}>
                History
                </div>
            </div>
            <div id="visualize" className="bar_item">
                <div style={active===1?selected:not_selected} onClick={() => clicked(1)}>
                    Visualization
                </div>
            </div>
            <div id="settings" className="bar_item">
                <div style={active===2?selected:not_selected} onClick={() => clicked(2)}>
                    ⚙
                </div>
            </div>
        </ div>
    );
};

export default Bar;
