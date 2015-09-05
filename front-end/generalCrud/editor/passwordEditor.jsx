import React from 'react';
 
class PasswordEditor extends React.Component {
    
    render() {
        return <input type="password" ref="field" defaultValue={this.props.value} />
    }
    
    getValue() {
        console.log("getValue!");
        return React.findDOMNode(this.refs.field).value;
    }

}

export default PasswordEditor;