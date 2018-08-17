import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VoteInput from './VoteInput.jsx';

import CouncilorList from '../components/CouncilorList.jsx';

class OrderInputFields extends Component {

  constructor(props) {

        super(props);

        this.state = {
          name: null,
          inputs: [
            {
              // We should have some kind of id or unique name for key, too
              // If Order Name, have example like 154-17/18
              type: 'text',
              label: 'Order Name',
              value: '',
            },
            {
              type: 'textarea',
              label: 'Description',
              value: '',
            },
            {
              type: 'url',
              label: 'Order PDF URL',
              value: '',
            },
          ],
          votes: [
            {
              councilor: 'belinda-s-ray',
              vote: 'yes'
            },
            {
              councilor: 'justin-costa',
              vote: 'no'
            },
            {
              councilor: 'jill-c-duson',
              vote: 'absent'
            },
          ],
        }

        this.onUpdateVote = this._onUpdateVote.bind(this);
  }

  componentDidMount() {

    console.log("Component Did Mount.");
    console.log(this.props.info);
  };

  _onUpdateVote(value, councilor) {

    this.setState((currentState) => {
      return {
        votes: [
          currentState.votes.filter((vote) => vote.councilor !== councilor ),
          {
            councilor: councilor,
            vote: value
          },
        ],
      }
    });
  }

  render() {

    return (
      <div className="orderFields">
        <form action="#">
          <h1>Details</h1>
          <label htmlFor="name">Order Name</label>
          {
            // Each of these inputs should be in state as an array of objects we can add to
            // Type, Label, Value
          }
          <input name='name' type="text" placeholder="154-17/18" defaultValue={this.props.name} />
          <input type="url" placeholder="Order PDF URL" defaultValue={this.props.url}/>
          <textarea cols="30" rows="10" placeholder="Order Description" defaultValue={this.props.description}></textarea>

          {
            // Here down should be a separate VoteInput container that 
          }
          <VoteInput votes={this.state.votes} onUpdateVote={this.onUpdateVote} councilors={this.props.info.councilor.councilors}/>
          

          <input type="submit" value="Submit"/>
        </form>
      </div>
    );

  }
}

OrderInputFields.defaultProps = {
  name: '154-17/18',
};

// For the time being, we'll pull the list of councilors from state.
// Ultimately, we'll need to associate an order with the councilors who were active when it was voted on
const mapStateToProps = state => ({
  info: state
});

export default connect(mapStateToProps)(OrderInputFields);
