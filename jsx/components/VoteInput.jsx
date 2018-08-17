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
    }

    _setVoteValue(e, councilor) {

        const value = e.target.value;
        this.props.onUpdateVote(value, councilor);
    }

    render() {

        const councilors = this.props.councilors.sort(establishRoleHierarchy);

        return (
            <div>
                <h1>Votes</h1><a>Mark Unanimous Vote</a>
                {
                    // First pass using a single entry
                }
                <CouncilorCard
                    condensed
                    name={councilors[0].name}
                    slug={slugify(councilors[0].name)}
                    role={councilors[0].role}
                    img={councilors[0].img}
                />
                <select 
                    value={
                        this.props.votes.find((vote) => vote.councilor === slugify(councilors[0].name))
                        && this.props.votes.find((vote) => vote.councilor === slugify(councilors[0].name)).vote|| ''
                    }
                    onChange={ (e) => this.setVoteValue(e, slugify(councilors[0].name))} 
                >
                    <option value='' disabled selected>Vote</option>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                    <option value='absent'>Absent</option>
                    <option value='abstain'>Abstain</option>
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(VoteInput);