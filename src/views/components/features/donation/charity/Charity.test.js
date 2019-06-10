import React from 'react';
import { shallow } from 'enzyme';
import Charity from './Charity';
import renderer from 'react-test-renderer';

describe('<Charity />', () => {
  const props={
    paymentHandler: jest.fn(),
    name: "",
    totalDonation: 0,
    currency: "",
    charityId: "",
    image: null

  }

  it('<Charity /> renders without crashing', () => {
    const wrapper = shallow(<Charity {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('<Charity /> renders without props', () => {
    const wrapper = shallow(<Charity />);
    expect(wrapper.exists()).toBe(true);
  });

  it('<Charity /> snapshot test', () => {
    const tree = renderer.create(<Charity {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
   it('<Charity /> snapshot test without props', () => {
    const tree = renderer.create(<Charity />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
