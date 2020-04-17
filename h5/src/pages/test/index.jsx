import React , { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("Store")
@observer
class Index extends Component {
  componentDidMount(){
    console.dir(this.props.Store)
  }
  render(){
    return (
      <div>
        <div>store { this.props.Store.name }</div>
      </div>
    )
  }
}

export default Index;
