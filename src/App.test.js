import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import { stub } from 'sinon';

import DisplayResult from './DisplayResult';
import MethodSelect from './MethodSelect'

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
  
  it('renders header', () => {
    const wrapper = shallow(<App />);
    const welcome = <h1>BMI Converter</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });

  it('shows metric as the standard method', () => {
    const component = shallow(<App />);
    const weightLabel = <label>Weight(kg)</label>;
    const heightLabel = <label>Height(cm)</label>;
    expect(component.contains(weightLabel)).toEqual(true);
    expect(component.contains(heightLabel)).toEqual(true);
  })

  it('can change method', () => {
    const onChangeValue = stub();
    const component = shallow(<App onChangeValue={onChangeValue} />);
    component.find("Child").prop('onChildClick')('foo');
  })
})

describe('<DisplayResult />', () => {
  it('displays the calulation correct(metric)', () => {
    const component = mount(<DisplayResult method='metric' weight='100' height='195'/>)
    const response = <div id='response'>You are Overweight with a BMI of 26.3</div>
    expect(component.contains(response)).toEqual(true)
  })

  it('displays the calulation correct(imperial)', () => {
    const component = mount(<DisplayResult method='imperial' weight='140' height='73'/>)
    const response = <div id='response'>You are Underweight with a BMI of 18.47</div>
    expect(component.contains(response)).toEqual(true)
  })

  it('does not show anything when one of the input fields are empty', () => {
    const component = mount(<DisplayResult method='metric' weight='' height='195'/>);
    expect(component.text()).toBe('')
  })
})

describe('<MethodSelect />', () => {
  it('has two methods to choose from', () => {
    const component = mount(<MethodSelect />);
    const selector = component.find('#method').instance()
    expect(selector.options.length).toEqual(2)
  }
)})
