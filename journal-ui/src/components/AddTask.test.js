import React from 'react';
import AddTask from './AddTask';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddTask />', () => {
  it('renders five <TextInput /> components', () => {
    const wrapper = shallow(<AddTask />);
    expect(wrapper.find('TextField')).toHaveLength(5);
  });
});