import React from 'react';
 
import materials from './model/materials' 

class Materials extends React.Component {
  render() {
    var array = [];
    for (var i = 0; i < materials.length; i++) {
        array.push(<div key={materials[i].id} className="material" style={{display: "block"}}>
                        <a className={"material-item material-" + materials[i].id} href={"#material/" + materials[i].id}>
                            <span>{materials[i].name}</span>
                        </a>
                    </div>);
    }
    return <div>{array}</div>;
  }
}
 
export default Materials;