import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CouncilorCard from '../components/CouncilorCard.jsx';
import slugify from '../utils/slugify';
import districtNumberFromRole from '../utils/districtNumberFromRole';
import establishRoleHierarchy from '../utils/establishRoleHierarchy';

class VoteInput extends Component {

    constructor(props) {

        super(props);
        this.setVoteValue = this._setVoteValue.bind(this);
        this.setVoteUnanimous = this._setVoteUnanimous.bind(this);
    }

    _setVoteValue(e, councilor) {

        const value = e.target.value;
        this.props.onUpdateVote(value, councilor);
    }

    _setVoteUnanimous(councilors) {

        councilors.forEach((councilor) => this.props.onUpdateVote('yes', slugify(councilor.name)))
    }

    render() {

        const councilors = this.props.councilors.sort(establishRoleHierarchy);

        const voteComponents = councilors.map(councilor => (
            <div className='voteInput'>
                <CouncilorCard
                    condensed
                    name={councilor.name}
                    slug={slugify(councilor.name)}
                    role={councilor.role}
                    img={councilor.img}
                />
                <select 
                    value={
                        this.props.votes.find((vote) => vote.councilor === slugify(councilor.name))
                        && this.props.votes.find((vote) => vote.councilor === slugify(councilor.name)).vote|| ''
                    }
                    onChange={ (e) => this.setVoteValue(e, slugify(councilor.name))} 
                >
                    <option value='' disabled selected>Vote</option>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                    <option value='absent'>Absent</option>
                    <option value='abstain'>Abstain</option>
                </select>
            </div>
        ));

        return (
            <div>
                <h1>Votes</h1><a onClick={() => this.setVoteUnanimous(councilors)}>Mark Unanimous Vote</a>
                {voteComponents}

            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(VoteInput);