import React, {Component} from 'react';
import Engine from './Engine';
import './style/Engines.css'


class Engines extends Component {
    constructor(props) {
        super(props);
        this.changeSelectedEngine = this.changeSelectedEngine.bind(this);
        this.state = {
            isLoading: true,
            engines: [],
            enginesRender: [],
            selected_engine: ""
        };
    }

    componentDidMount() {
        fetch('/fleet')
            .then(res => res.json())
            .then(result => {
                let engines = [];
                for (let i = 0; i < result.length; i++) {
                    engines[result[i]._id] = result[i];
                }
                document.documentElement.style.setProperty('--engines_number', result.length);
                this.setState({
                    isLoading: false,
                    engines: engines
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    changeSelectedEngine(engine_id) {
        this.setState({selected_engine: engine_id});
        this.props.getSelectedEngine(this.state.engines[engine_id]);
    }

    render() {
        let enginesRender = [];
        if (!this.isLoading) {
            for (let key in this.state.engines) {
                let engine = this.state.engines[key];
                enginesRender.push(
                    <Engine
                        key={engine._id}
                        data={engine}
                        getId={this.changeSelectedEngine}
                        isSelected={engine._id === this.state.selected_engine}
                    />
                );
            }
        }

        return (
            <React.Fragment>
            <div className='engines'>
                <div className='engines_header'> Select an engine </div>
                {this.state.isLoading === true
                    ? <div className='no_result'> No result found! </div>
                    : <div className={"engines_container"}>
                        {enginesRender}
                    </div>
                }
                <div/>
            </div>
            </React.Fragment>

        )
    }
}

export default Engines;
