import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VoteInput from './VoteInput.jsx';

import CouncilorList from '../components/CouncilorList.jsx';

class OrderInputFields extends Component {

  constructor(props) {

        super(props);

        this.state = {
          id: '',
          // inputs: [
          //   {
          //     // We should have some kind of id or unique name for key, too
          //     // If Order Name, have example like 154-17/18
          //     type: 'text',
          //     label: 'Order Name',
          //     value: '',
          //   },
          //   {
          //     type: 'textarea',
          //     label: 'Description',
          //     value: '',
          //   },
          //   {
          //     type: 'url',
          //     label: 'Order PDF URL',
          //     value: '',
          //   },
          // ],
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

        this.handleUpdateVote = this._handleUpdateVote.bind(this);
        this.updateInput = this._updateInput.bind(this);
  }

  componentDidMount() {

    console.log("Component Did Mount.");
    console.log(this.props.info);
  };

  _updateInput(e, field) {
    const value = e.target.value

    this.setState(() => ({
      [field]: value
    }))
  }

  _handleUpdateVote(value, councilor) {

    console.log(`We have ${value} for ${councilor}`);

    this.setState((currentState) => {
      console.log(currentState.votes.filter((vote) => vote.councilor !== councilor ));
      return {
        votes: [
          ...currentState.votes.filter((vote) => vote.councilor !== councilor ),
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
          {
            // Each of these inputs should be in state as an array of objects we can add to
            // Type, Label, Value
            // Possible types: Text, Textarea (rename for clarity), URL, Date, Number?
            // Maybe a "Need a custom field type? Suggest a feature to the developers."
            // We should think about what to do for Proclamations too, not just orders
            // Maybe just a toggle switch?

          }

          <div className='diptych'>

            <div className='inputContainer'>
              <label htmlFor="name">Order ID</label>
              <input name='name' type="text" placeholder="154-17/18" value={this.props.id} onChange={(e) => this.updateInput(e, 'id')} />
            </div>

            <div className='inputContainer'>
              <label htmlFor="date-of-vote">Date Of Vote</label>
              <input name='date-of-vote' type="date" />
            </div>

          </div>

          <label htmlFor="short-description">Order Name</label>
          <input name='short-description' placeholder="Order Appointing Members to Various Boards and Committees" />

          <label htmlFor="url">Order PDF URL</label>
          <input name='url' type="url" placeholder="http://www.portlandmaine.gov/AgendaCenter/ViewFile/Item/5877?fileID=29791" defaultValue={this.props.url}/>

          <label htmlFor="description">Order Description</label>
          <textarea name='description' cols="30" rows="10" placeholder="Order Description" defaultValue={this.props.description}></textarea>

          <VoteInput votes={this.state.votes} onUpdateVote={this.handleUpdateVote} councilors={this.props.info.councilor.councilors}/>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    );

  }
}

// OrderInputFields.defaultProps = {
//   // name: '154-17/18',
// };

// For the time being, we'll pull the list of councilors from state.
// Ultimately, we'll need to associate an order with the councilors who were active when it was voted on
const mapStateToProps = state => ({
  info: state
});

export default connect(mapStateToProps)(OrderInputFields);
