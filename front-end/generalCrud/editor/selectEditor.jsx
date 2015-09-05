"use strict";
import React from 'react';
 
class SelectEditor extends React.Component {
    
    constructor(props) {
        super(props);
        if (this.props.store) {
            this.state = this.props.store.getData();
            if (!this.state.loaded) {
                this.props.actions.load();
            }
            this.props.actions.resetState();
        }
    }
    
    render() {
        var options = [];
        options.push(<option key="null-value" value="">Selecione um</option>)
        var opts = this.props.options;
        if (!opts) {
            if (this.props.store) {
                opts = this.state.list;
            }
        } else {
            if (typeof opts  == 'function') {
                opts = opts();
            }
        }
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                var value = null;
                var name = null;
                var theValue = opts[i];
                if (this.props.transformation) {
                    theValue = this.props.transformation(theValue);
                }
                if (typeof theValue == 'string') {
                    value = name = theValue;
                } else {
                    value = theValue.value;
                    name = theValue.name;
                }
                options.push(<option key={value + "value"} value={value}>{name}</option>)
            }
        }
        
        
        return <select ref="field" defaultValue={this.props.value}>
                {options}
                </select>
    }
    
    getValue() {
        var value = React.findDOMNode(this.refs.field).value;
        return value === ""? null: value;
    }
    
    onStoreChange(data) {
        this.setState(data);
    }

    componentDidMount() {
        this.unsubscribe = this.props.store.listen(this.onStoreChange.bind(this));
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

}

export default SelectEditor;