import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

  componentWillMount(){
    this.props.getMessageFromAPI();
  }

  render() {
    return (
      <div>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { message: state.data.message};
}

export default connect(mapStateToProps, actions)(Feature);
