import React from 'react';
import Plot from 'react-plotly.js';
import main from './main-loop';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.totalEcosystem = [0];
    this.maxCycles = 1000;
    this.xArray = this.xArray.bind(this);
    main(this.totalEcosystem, this.maxCycles);
  }

  xArray() {
    const xArray = [];
    for (let i = 0; i < this.totalEcosystem.length; i++) {
      xArray.push(i);
    }
    return xArray;
  }

  render() {
    return (
      <Plot
        data={[
          {
            x: this.xArray(),
            y: this.totalEcosystem,
            type: 'scatter',
            mode: 'markers',
            marker: { size: 1, color: '#000066' }
          }
        ]}
        layout={{ width: 1024, height: 768, title: 'Evolution Model' }}
      />
    );
  }
}

export default App;
