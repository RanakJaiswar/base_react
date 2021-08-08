import React from "react";
import { PropTypes } from "prop-types";

class Info extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            count: 0,
        };
        //this.buttonPressed = this.buttonPressed.bind(this);
    }

    buttonPressed() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.buttonPressed()}>Click ME!</button>
            </div>
        );
        /*
        const title = this.props.title;
        const showtitle = true;
        if (showtitle) {
            return (
                <div>
                    <h1>{title}</h1>
                    <p>Manage your stuff.</p>
                </div>
            );
        } else {
            return <p>empty</p>;
        }
        */
    }
}

/*
Info.defaultProps = {
    title: "Default",
}

Info.propTypes = {
    title: PropTypes.string,
}
*/

export default Info;