import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

//import './BookInfo.css';

class BookInfo extends Component{


  render(){
    const containerStyle = {
      height: '500px',
      width: '800px',
      border: '1px solid gray',
    };

    const imageStyle = {
      height: '500px',
      width: 'auto',
      textAlign: 'left',
      padding: '20px',
    };

    const infoStyle = {
      height: '500px',
      width: '400px',
      textAlign: 'left',
      padding: '20px',
    };
    
    const titleStyle = {};
    const authorStyle = {};
    const publisherStyle = {};
    const publishedDateStyle = {};

    const title = '1984';
    const author = 'George Orwell';
    const publisher = 'Secker & Warburg';
    const publishedDate = 'June 8, 1949';



    return (
      <div style={containerStyle} >
        <div className="image" style={{textAlign: 'left'}}>
          <Image 
            src='https://dynamic.indigoimages.ca/books/1788282361.jpg?altimages=false&scaleup=true&maxheight=515&width=380&quality=85&sale=0&lang=en' 
            style={imageStyle}
          />
        </div>
      </div>
    );
  }
}

export default BookInfo;