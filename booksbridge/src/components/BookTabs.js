import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class BookTabs extends Component {
  componentDidMount(){

  }

  static getDerivedStateFromProps(nextProps, nextState){
      return nextState;
  }

  render(){
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
    }

    const tabStyle = {
      textAlign: 'center',
    }

    const cityUponAHill = 'Now the only way to avoid this shipwreck, and to provide for our posterity, is to follow the counsel of Micah, to do justly, to love mercy, to walk humbly with our God. For this end, we must be knit together, in this work, as one man. We must entertain each other in brotherly affection. We must be willing to abridge ourselves of our superfluities, for the supply of others’ necessities. We must uphold a familiar commerce together in all meekness, gentleness, patience and liberality. We must delight in each other; make others’ conditions our own; rejoice together, mourn together, labor and suffer together, always having before our eyes our commission and community in the work, as members of the same body. So shall we keep the unity of the spirit in the bond of peace. The Lord will be our God, and delight to dwell among us, as His own people, and will command a blessing upon us in all our ways, so that we shall see much more of His wisdom, power, goodness and truth, than formerly we have been acquainted with. We shall find that the God of Israel is among us, when ten of us shall be able to resist a thousand of our enemies; when He shall make us a praise and glory that men shall say of succeeding plantations, “may the Lord make it like that of New England.” For we must consider that we shall be as a city upon a hill. The eyes of all people are upon us. So that if we shall deal falsely with our God in this work we have undertaken, and so cause Him to withdraw His present help from us, we shall be made a story and a by-word through the world. We shall open the mouths of enemies to speak evil of the ways of God, and all professors for God’s sake. We shall shame the faces of many of God’s worthy servants, and cause their prayers to be turned into curses upon us till we be consumed out of the good land whither we are going.';
    const theArmySong = 'March along, sing our song, with the Army of the free\nCount the brave, count the true, who have fought to victory\nWe\'re the Army and proud of our name\nWe\'re the Army and proudly proclaim\nFirst to fight for the right,\nAnd to build the Nation\'s might,\nAnd The Army Goes Rolling Along\nProud of all we have done,\nFighting till the battle\'s won,\nAnd the Army Goes Rolling Along.\nThen it\'s Hi! Hi! Hey!\nThe Army\'s on its way.\nCount off the cadence loud and strong!\nFor where e\'er we go, You will always know\nThat The Army Goes Rolling Along.';
    const harryPotter = 'Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense.\nMr. Dursley was the director of a firm called Grunnings, which made drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son called Dudley and in their opinion there was no finer boy anywhere. \nThe Dursleys had everything they wanted, but they also had a secret, and their greatest fear was that somebody would discover it. They didn\'t think they could bear it if anyone found out about the Potters. Mrs. Potter was Mrs. Dursley\'s sister, but they hadn\'t met for several years; in fact, Mrs. Dursley pretended she didn\'t have a sister, because her sister and her good-for-nothing husband were as unDursleyish as it was possible to be. The Dursleys shuddered to think what the neighbors would say if the Potters arrived in the street. The Dursleys knew that the Potters had a small son, too, but they had never even seen him. This boy was another good reason for keeping the Potters away; they didn\'t want Dudley mixing with a child like that. \nWhen Mr. and Mrs. Dursley woke up on the dull, gray Tuesday our story starts, there was nothing about the cloudy sky outside to suggest that strange and mysterious things would soon be happening all over the country. Mr. Dursley hummed as he picked out his most boring tie for work, and Mrs. Dursley gossiped away happily as she wrestled a screaming Dudley into his high chair.\nNone of them noticed a large, tawny owl flutter past the window.';
    const mala = '어 마라탕 먹고싶다';

    return (
      <Tabs defaultActiveKey='summary' id='review_table'>
        <Tab eventKey='summary' title='Summary'>
          <p>{cityUponAHill}</p>
        </Tab>
        <Tab eventKey='short_review' title='Short Review'>
          <p>{theArmySong}</p>
        </Tab>
        <Tab eventKey='long_review' title='Long Review'>
          <p>{harryPotter}</p>
        </Tab>
        <Tab eventKey='phrase' title='Phrase'>
          <p>{mala}</p>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BookTabs);