import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Tab } from 'semantic-ui-react';

import './BookTab.css';

class BookTabs extends Component {
  componentDidMount() {

  }

  render() {

    const theArmySong = 'March along, sing our song, with the Army of the free\nCount the brave, count the true, who have fought to victory\nWe\'re the Army and proud of our name\nWe\'re the Army and proudly proclaim\nFirst to fight for the right,\nAnd to build the Nation\'s might,\nAnd The Army Goes Rolling Along\nProud of all we have done,\nFighting till the battle\'s won,\nAnd the Army Goes Rolling Along.\nThen it\'s Hi! Hi! Hey!\nThe Army\'s on its way.\nCount off the cadence loud and strong!\nFor where e\'er we go, You will always know\nThat The Army Goes Rolling Along.';
    const harryPotter = 'Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense.\nMr. Dursley was the director of a firm called Grunnings, which made drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son called Dudley and in their opinion there was no finer boy anywhere. \nThe Dursleys had everything they wanted, but they also had a secret, and their greatest fear was that somebody would discover it. They didn\'t think they could bear it if anyone found out about the Potters. Mrs. Potter was Mrs. Dursley\'s sister, but they hadn\'t met for several years; in fact, Mrs. Dursley pretended she didn\'t have a sister, because her sister and her good-for-nothing husband were as unDursleyish as it was possible to be. The Dursleys shuddered to think what the neighbors would say if the Potters arrived in the street. The Dursleys knew that the Potters had a small son, too, but they had never even seen him. This boy was another good reason for keeping the Potters away; they didn\'t want Dudley mixing with a child like that. \nWhen Mr. and Mrs. Dursley woke up on the dull, gray Tuesday our story starts, there was nothing about the cloudy sky outside to suggest that strange and mysterious things would soon be happening all over the country. Mr. Dursley hummed as he picked out his most boring tie for work, and Mrs. Dursley gossiped away happily as she wrestled a screaming Dudley into his high chair.\nNone of them noticed a large, tawny owl flutter past the window.';
    const mala = '어 마라탕 먹고싶다';

    const panes = [
      { menuItem: 'Summary', render: () => <Tab.Pane>{this.props.contents}</Tab.Pane> },
      { menuItem: 'Short Review', render: () => <Tab.Pane>{theArmySong}</Tab.Pane> },
      { menuItem: 'Long Review', render: () => <Tab.Pane>{harryPotter}</Tab.Pane> },
      { menuItem: 'Phrase', render: () => <Tab.Pane>{mala}</Tab.Pane> },
    ]

    return (
      <div className='DetailTabStyle'>
        <Tab panes={panes} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookTabs));