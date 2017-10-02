import React from 'react';
import PropTypes from 'prop-types';

import OrderInputFields from '../components/OrderInputFields.jsx';

const PDFJS = require('pdfjs-dist');

var renderPDF = function() {
  var start = function() {
    console.log("starting");
    getPDF();
  };
  var getPDF = function() {
    console.log("getting document");
    var url = 'http://cdn.mozilla.net/pdfjs/helloworld.pdf';
    PDFJS.getDocument(url)
      .then(pdf => getPage(null, pdf))
      .catch(getPage);
  };
  var getPage = function(err, pdf) {
    if (err) {
      return console.log("Error: "+err);
    }
    console.log("got pdf");
    pdf.getPage(1)
      .then(page => render(err, page))
      .catch(render);
  };
  var render = function(err, page) {
    if (err) {
      return console.log("Error:"+err);
    }
    console.log("got page");
    // from example
    var scale = 1.5;
    var viewport = page.getViewport(scale);
    var canvas = document.getElementById('pdf-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    // end example
    console.log("rendering");
    page.render(renderContext);
  }

  start();
}

// import * as fs from 'fs';
// const fs = require('fs');

const OrderInput = props => {
  renderPDF(); // hack! hack!
  return (
    <div>
      <OrderInputFields />
      <canvas style={{border: "1px dotted black"}} id="pdf-canvas"></canvas>
    </div>
  );
}

export default OrderInput;
