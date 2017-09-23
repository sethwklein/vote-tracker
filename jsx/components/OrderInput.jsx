import React from 'react';
import PropTypes from 'prop-types';

import OrderInputFields from '../components/OrderInputFields.jsx';

const PDFJS = require('pdfjs-dist');
// import * as fs from 'fs';
// const fs = require('fs');

// loadingTask.promise.then(function(pdf) {
//   console.log('PDF loaded');
// }


const OrderInput = props => {

  console.log("Hello from OrderInput");
  var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';
  console.log("We have a PDF.");
  var loadingTask = PDFJS.getDocument(url);


  return (
    <div>
      <div className="pdfViewerWindow">PDF Goes here</div>

      <OrderInputFields />
    </div>
  );
}

export default OrderInput;
