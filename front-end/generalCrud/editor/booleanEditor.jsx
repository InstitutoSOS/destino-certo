import React from 'react';
 
class BooleanEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value:  this.props.value};
    }
    
    render() {
        return <input type="checkbox" ref="field" checked={this.state.value} onChange={this.onChange.bind(this)} />
    }
    
    getValue() {
        return React.findDOMNode(this.refs.field).checked;
    }
    
    onChange() {
        this.setState({value: React.findDOMNode(this.refs.field).checked});
    }

}

export default BooleanEditor;