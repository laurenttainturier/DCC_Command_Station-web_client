import React, {Component} from 'react';
import './style/SpeedPotentiometer.css'


class SpeedPotentiometer extends Component {
    constructor(props) {
        super(props);
        this.resizePotentiometer = this.resizePotentiometer.bind(this);
        this.onHover = this.onHover.bind(this);
        this.state = {
            step_selected: -1,
            step_nb: 28,
            percentage: 0,
            startingColor: "rgb(234, 32, 39)",
            endingColor: "rgb(0, 148, 50)"
        };
    }

    onHover(event) {
        if (event.buttons === 1) {
            this.changeSelectedStep(event);
        }
    }

    changeSelectedStep = (event) => {
        event.preventDefault();

        // get the class name of the selected step
        let stepClassName = event.currentTarget.className;

        if (stepClassName === "stop")
            this.setState({step_selected: -1});
        else {
            // get the id of the step from ts class name
            let stepId = stepClassName.match(/[0-9]+/);
            let percentage = Math.max(0, Math.floor(stepId / this.state.step_nb * 100 + 0.5));
            this.setState({
                step_selected: stepId,
                percentage: percentage
            });
        }
    };

    resizePotentiometer() {
        document.documentElement.style.setProperty('--speed-nb', this.state.step_nb.toString());
        document.documentElement.style.setProperty('--height', this.divElement.clientHeight + "px");
        document.documentElement.style.setProperty('--width', 0.3 * this.divElement.clientHeight + "px");
    }

    componentDidMount() {
        this.resizePotentiometer();
        window.addEventListener("resize", this.resizePotentiometer);
    }

    render() {
        let enginesRender = [];
        let regex = /([0-9]{1,3})/g;
        let starting_colors = this.state.startingColor.match(regex);
        let ending_colors = this.state.endingColor.match(regex);

        for (let i = this.state.step_nb - 1; i > 1; i--) {
            let percent = i / (this.state.step_nb - 1);
            let width = (30 + percent * 70).toFixed(2) + "%";
            let backgroundColor = "rgb(x0, x1, x2)";

            if (i <= this.state.step_selected) {
                backgroundColor = backgroundColor.replace(/x([0-2])/g, function (match, i) {
                    return Math.round((starting_colors[i] - ending_colors[i]) * percent + parseInt(ending_colors[i], 10));
                });
            }
            else
                backgroundColor = "rgb(45, 46, 47)";

            let speedStyle = {
                width: width,
                backgroundColor: backgroundColor
            };

            enginesRender.push(
                <div className={"step_container speed_" + i} key={i}
                     onMouseEnter={this.onHover}
                     onClick={this.changeSelectedStep}>
                    <div className={"step"} style={speedStyle}> </div>
                </div>
            );
        }

        enginesRender.push(
            <div key={"stop"} className={"stop"} onMouseEnter={this.onHover} onMouseDown={this.changeSelectedStep}>
                <span> {this.state.percentage}% </span>
            </div>
        );


        return (
            <div className='speed_potentiometer' ref={divElement => this.divElement = divElement}>
                {enginesRender}
            </div>
        )
    }
}

export default SpeedPotentiometer;
