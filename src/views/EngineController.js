import React, {Component} from 'react';
import SpeedPotentiometer from './SpeedPotentiometer';

import './style/EngineController.css'


class EngineController extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='engine_controller'>
                {
                    this.props.hidden
                        ? <div> No engine selected ! </div>
                        : [
                            <div key={"div"}>
                                You have selected the engine {this.props.engine.name} <br/>
                                with the id {this.props.engine._id}
                            </div>,
                            <SpeedPotentiometer key={"potentiometer"}/>
                        ]
                }
            </div>
        );
    }
}

export default EngineController;
