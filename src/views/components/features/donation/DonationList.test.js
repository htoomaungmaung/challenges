import React from 'react';
import { shallow } from 'enzyme';
import DonationList from './DonationList';
import renderer from 'react-test-renderer';

describe('<DonationList />', () => {
  const props={
    charities: [{
      name: "",
      totalDonation: 0,
      currency: "",
      id: ""
    }],
    paymentHandler: jest.fn()
  }

  it('<DonationList /> renders without crashing', () => {
    const wrapper = shallow(<DonationList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('<DonationList /> renders without props', () => {
    const wrapper = shallow(<DonationList />);
    expect(wrapper.exists()).toBe(true);
  });

  it('<DonationList /> snapshot test', () => {
    const tree = renderer.create(<DonationList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
    it('<DonationList /> snapshot test without props', () => {
    const tree = renderer.create(<DonationList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
