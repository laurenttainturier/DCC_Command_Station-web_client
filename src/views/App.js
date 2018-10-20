import React, {Component} from 'react';
import './style/App.css';
import Engines from './Engines';
import EngineController from './EngineController';

class App extends Component {
    constructor(props) {
        super(props);
        this.getSelectedEngine = this.getSelectedEngine.bind(this);

        this.state = {
            hidden_engine: true,
            selected_engine: {}
        }
    }

    getSelectedEngine(engine) {
        console.log("constructor:", engine);
        this.setState({
            hidden_engine: false,
            selected_engine: engine
        });
    }

    render() {
        return (
            <div className="App">
                <header className={"App-title"}> TRAIN CONTROLLER </header>
                <Engines getSelectedEngine={this.getSelectedEngine}/>
                <EngineController
                    hidden={this.state.hidden_engine}
                    engine={this.state.selected_engine}
                />
            </div>
        );
    }
}

export default App;
