import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 75,
      height: 175,
      method: 'metric',
      weightType: 'kg',
      heightType: 'cm'
    }
  }

  bmi() {
    let w = parseFloat(this.state.weight);
    let h = parseFloat(this.state.height);
    let m = this.state.method;
    let bmi;

    w = isNaN(w) ? 0 : w;
    h = isNaN(h) ? 0 : h;

    if (m === 'metric') {
      bmi = w / (h / 100 * h / 100);
    } else if (m === 'imperial') {
      bmi = (w * 703 ) / (h * h);
    }

    let finalBMI = parseFloat(bmi.toFixed(2));
    if (isNaN(finalBMI) || !isFinite(finalBMI) || finalBMI === 0) {
      return '';
    } else {
      return `You are ${this.setBMIMessage(finalBMI)} with a BMI of ${finalBMI}`;
    }      
  }

  setBMIMessage(finalBMI) {
    if (finalBMI < 18.5) {
      return "Underweight";
    }
  
    if (finalBMI > 18.5 && finalBMI < 25) {
      return "Normal";
    }
  
    if (finalBMI > 25 && finalBMI < 30) {
      return "Overweight";
    }
  
    if (finalBMI > 30) {
      return "Obese";
    }
  }

  setInputType() {    
    if (this.state.method === 'imperial') {
      this.setState({weightType: 'lbs', heightType: 'inches' });
    } else if (this.state.method === 'metric') {
      this.setState({weightType: 'kg', heightType: 'cm' });
    }
  }

  render() {
    return (
      <div>
        <select id="method" name="method" onChange={(e) => { 
          this.setState({method: e.target.value}, () => {
            this.setInputType();
          })}}>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>

        <div>
          <label>Weight({this.state.weightType})</label>
          <input type="tel" value={this.state.weight} onChange={(e) => this.setState({weight: e.target.value})}/>
        </div>

        <div>
          <label>Height({this.state.heightType}) </label>
          <input type="tel" value={this.state.height} onChange={(e) => this.setState({height: e.target.value})}/>
        </div>

        <div>
          <p>{this.bmi()}</p>
        </div>
      </div>
    );
  }
}

export default App
