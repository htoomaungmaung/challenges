import React from 'react';
import { shallow, mount } from 'enzyme';
import Payment from './Payment';
import renderer from 'react-test-renderer';

describe('<Payment />', () => {
  const props={
    paymentHandler: jest.fn(),
    paymentOptions: [10, 20, 50, 100, 500],
    charityId: "",
    currency: "",
    donating: true,
    closeHandler : jest.fn()

  }

  it('<Payment /> renders without crashing', () => {
    const wrapper = shallow(<Payment {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('<Payment /> renders without props', () => {
    const wrapper = shallow(<Payment />);
    expect(wrapper.exists()).toBe(true);
  });

  it('<Payment /> snapshot test', () => {
    const tree = renderer.create(<Payment {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

    it('<Payment /> snapshot test without props', () => {
    const tree = renderer.create(<Payment />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('calls onClick handlers', () => {
    const wrapper = mount(<Payment {...props} />);
    const buttons = wrapper.find("button");

    buttons.at(0).simulate('click');
    expect(props.closeHandler.mock.calls.length).toEqual(1);

    buttons.at(1).simulate('click');
    expect(props.paymentHandler.mock.calls.length).toEqual(1);
  });

});
