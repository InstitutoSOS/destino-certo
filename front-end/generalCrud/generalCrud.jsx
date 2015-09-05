import React from 'react';
import {default as objectAssign} from 'object-assign'; 
 
class GeneralCrud extends React.Component {

  constructor(props) {
    super(props);
    //console.log(props);
    this.state = this.props.store.getData();
    if (!this.state.loaded) {
        this.props.actions.load();
    }
    this.props.actions.resetState();
  }

  render() {
    if (!this.state.editing) {
        var rows = [];
        var columns = this.props.columns;
        var colunas = [];
        for (var j = 0; j < columns.length; j++) {
            colunas.push(<th key={columns[j].field}>{columns[j].name}</th>);
        }
        colunas.push(<th key={"header-actions"}>Ações <button style={{float:"right"}} className="btn-sm btn-default" onClick={this.fireAdd.bind(this)}><i className="fa fa-plus"></i></button> </th>);
        rows.push(<tr key="header">{colunas}</tr>);

        if (this.state.list) {
            for (var i = 0; i < this.state.list.length; i++) {
                var obj = this.state.list[i];
                colunas = [];
                for (var j = 0; j < columns.length; j++) {
                    var value = obj[columns[j].field];
                    if (columns[j].renderer) {
                        value= React.createElement(columns[j].renderer, {value:value});
                    }
                    
                    colunas.push(<td key={"item-" + obj.id + "-" + columns[j].field}>{value}</td>);
                }
                colunas.push(<td key={"item-" + obj.id + "-actions"}>
                                <button className="btn-sm btn-default" onClick={this.fireEdit.bind(this, obj)}><i className="fa fa-pencil"></i></button> 
                                <button  className="btn-sm btn-default" onClick={this.fireDelete.bind(this, obj)}><i className="fa fa-trash"></i></button>
                            </td>)
                rows.push(<tr key={"item-" + obj.id}>{colunas}</tr>);
            }
        }
        var error = null;
        if (this.state.errorMsg) {
            error = <div className="mensagemErro">{this.state.errorMsg}</div>
        }
        return  <div >
                    {  error }
                    <table>
                        {rows}
                    </table>
                </div>;
    } else {
        var fields = [];
        var columns = this.props.editColumns;
        var erros = {};
        if (this.state.errors) {
            for (var i = 0; i < this.state.errors.length; i++) {
                erros[this.state.errors[i].path] = this.state.errors[i].message;
            }
        }
        for (var j = 0; j < columns.length; j++) {
            var input = null;
            if (columns[j].editor) {
                input = React.createElement(columns[j].editor, objectAssign({value:this.state.edited[columns[j].field], ref: "input-" + columns[j].field}, columns[j].editorParams));
            } else {
                input = <input type="text" ref={"input-" + columns[j].field} defaultValue={this.state.edited[columns[j].field]}/>
            }
            var erro = null;
            if (erros[columns[j].field]) {
                erro = <div className="mensagemErro">{erros[columns[j].field]}</div>
            }
            fields.push(<p key={columns[j].field}>
                            <label>{columns[j].name}</label>
                            {input}
                            {erro}
                            </p>);
        }
         return  <div>
                    <fieldset>
                    {fields}
                    <p className="text-center">
                        <button onClick={this.doSave.bind(this,this.state.edited)}>Salvar</button>
                    </p>
                    </fieldset>
                </div>;
    }
  }
  
    onStoreChange(data) {
        //console.log(data);
        this.setState(data);
    }

    componentDidMount() {
        this.unsubscribe = this.props.store.listen(this.onStoreChange.bind(this));
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    fireEdit(obj, e) {
        this.props.actions.startEdit(obj);
    }
    
    fireDelete(obj, e) {
        this.props.actions.delete(obj);
    }
    
    
    
    fireAdd(e) {
       this.props.actions.startAdd();
    }
    
    doSave(obj, e) {
        console.log(obj);
        var columns = this.props.editColumns;
         for (var j = 0; j < columns.length; j++) {
            var input = null;
            if (columns[j].editor) {
                obj[columns[j].field] = this.refs["input-" + columns[j].field].getValue();
            } else {
                obj[columns[j].field] = React.findDOMNode(this.refs["input-" + columns[j].field]).value;
            }
        }
        console.log(obj);
        this.props.actions.save(obj);
    }
  
}
 
export default GeneralCrud;