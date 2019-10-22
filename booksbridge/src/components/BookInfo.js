import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';


class BookInfo extends Component{


    render(){
        return (
            <div>
                <div>
                    <Image src='https://misc.ridibooks.com/cover/510000454/xxlarge' rounded />
                </div>
            </div>
        );
    }
}

export default BookInfo;