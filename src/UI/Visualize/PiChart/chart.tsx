import React, {FC, useState}  from "react";
import "./chart.css";

const Chart: FC<{size:[string,string],browser_data:{category:string,count:number}[]}> = ({size,browser_data}) => {
    let colors = ["#bfb2f3","#96caf7","#9cdcaa","#e5e1ab","#f3c6a5","#f8a3a8"];

    const points = (angle:number ) => {
        let out = "50, 50";
        for(let a=0; a<angle; a+=Math.PI/2) {
            out += " " + (50 + Math.sin(a)*75) + ", " + (50+75*Math.cos(a))+ " ";
        }
        out += " " + (50 + Math.sin(angle)*75) + ", " + (50+75*Math.cos(angle))+ " ";
        return out + "50, 50";
    }
    const cut =  (depth:number) => {
        if(depth >= browser_data.length) {
            return;
        }
        return (
            <g transform={"rotate("+360 * browser_data[depth].count + " 50 50)"}>
                <clipPath id={browser_data[depth].category}>
                    <polygon points={points(2*Math.PI * browser_data[depth].count)}/>
                </clipPath>
                <ellipse cx="50" cy="50" rx="50"ry="50" fill={colors[depth%colors.length]} clip-path={"url(#"+browser_data[depth].category+")"} onMouseEnter={() => set_select(browser_data[depth].category+":"+Math.floor(browser_data[depth].count*1000)/10+"%")}/>
                {cut(depth+1)}
            </g>
        );
    }

    let [selected,set_select] = useState<string>("");


    return (
        <div className="chart" style={{width:size[0],height:size[1]}}>
            <div id="Selected"> Selected: {selected} </div>
            <svg viewBox="0 0 100 100">
                {cut(0)}
            </svg>
        </div>
    );
};

export default Chart;
