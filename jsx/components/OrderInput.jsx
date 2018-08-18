import React from 'react';
import PropTypes from 'prop-types';
import OrderInputFields from '../components/OrderInputFields.jsx';
import { PDFJS } from 'pdfjs-dist';
const internals = {};

class OrderInput extends React.Component {

constructor(props) {

    super(props);

    this.state = {
      loading: false
    }
}

componentDidMount(){
  // this.renderPDF();
}

// Mostly example code

// renderPDF() {
//   var start = () => {
//     console.log("starting");
//     this.setState({ loading: true });
//     getPDF();
//   };
//   var getPDF = function() {
//     console.log("getting document");
//     var url = 'http://cdn.mozilla.net/pdfjs/helloworld.pdf';
//     // var url = 'http://www.portlandmaine.gov/AgendaCenter/ViewFile/Item/5877?fileID=29791';
//     PDFJS.getDocument(url)
//       .then(pdf => getPage(null, pdf))
//       .catch(getPage);
//   };
//   var getPage = function(err, pdf) {
//     if (err) {
//       return console.log("Error: "+err);
//     }
//     console.log("got pdf");
//     pdf.getPage(1)
//       .then(page => render(err, page))
//       .catch(render);
//   };
//   var render = (err, page) => {
//     if (err) {
//       return console.log("Error:"+err);
//     }
//     console.log("got page");
//     this.setState({ loading: false })
//     // from example
//     var scale = 1.5;
//     var viewport = page.getViewport(scale);
//     var canvas = document.getElementById('pdf-canvas');
//     var context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };
//     // end example
//     console.log("rendering");
//     page.render(renderContext);
//   }

//   start();
// }

render() {

  return (
    <div>
      <OrderInputFields />
      {
        // this.state.loading ? <p>Loading…</p> : <canvas style={{border: "1px dotted black"}} id="pdf-canvas"></canvas>
      }
    </div>
  );
}

}

export default OrderInput;
