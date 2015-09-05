import React from 'react';
 
class BooleanRenderer extends React.Component {
    
    render() {
        if (this.props.value) {
            return <i className="fa fa-check"></i>
        } else {
            return <span />
        }
        
    }

}

export default BooleanRenderer;