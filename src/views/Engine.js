import React, {Component} from 'react';
import './style/Engine.css';
import loco from "./../img/default_loco.png";


class Engine extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleLoadedImage = this.handleLoadedImage.bind(this);
        this.state = {
            loading: true,
            imageSrc: '',
            properties: props.data
        };
    }

    handleClick() {
        this.props.getId(this.state.properties._id);
    }

    componentDidMount() {
        this.setState({loading: false});
    }

    handleLoadedImage() {
        this.setState({loading: false});
    }

    render() {
        let className = 'engine';
        if (this.props.isSelected)
            className += ' is-active';

        return (
            <div className={className} onClick={this.handleClick}>
                <div> {this.state.properties.name} </div>
                {
                    this.state.loading
                        ? <img src={loco} alt="a loco"/>
                        : <img src={this.state.properties.image_path} onLoad={this.handleLoadedImage} alt="a locomotive"/>
                }
            </div>
        )
    }
}


export default Engine
