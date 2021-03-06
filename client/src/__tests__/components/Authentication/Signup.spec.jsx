import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedSignup,
{ Signup } from '../../../components/Authentication/Signup';

const signupUser = jest.fn(() => Promise.resolve(true));
const clearErrorMessage = jest.fn();
const error = 'This is an error message';
const errorMessage = '';
const props = { signupUser, errorMessage, clearErrorMessage };
const store = mockStore({ authReducer: { error } });
const profileObj = {
  email: 'aimee@gmail.com',
  givenName: 'aimee',
  familyName: 'dykiii',
  googleId: '11229993',
  imageUrl: 'kndknsl'
};

const setUp = () => shallow(<Signup { ...props } />);

describe('Connected Signup component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedSignup store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Signupcomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });

  test('it should contain the signup greeting', () => {
    const wrapper = setUp();
    expect(wrapper.find('h4').text()).toBe('New User? Join Us!');
  });

  test(`should call handleChange when there is a change in any field 
  and set the fields value to state`, () => {
      const wrapper = setUp();
      const handleChangeSpy = jest.spyOn(
        wrapper.instance(), 'handleChange'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'email', value: 'aimee@yahoo.com' }
      };
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().state.email).toBe('aimee@yahoo.com');
    });

  test('it should call renderAlert when there is a change in props', () => {
    const wrapper = shallow(<Signup { ...props } />);
    wrapper.setProps({ errorMessage: 'nextProps error' });
    expect(wrapper.length).toBe(1);
    expect(props.clearErrorMessage).toHaveBeenCalled();
  });

  test('should not call signup action creator if passwords differ', () => {
    const wrapper = setUp();
    wrapper.setState({
      password: 'hiiii',
      confirmPassword: 'hellooooo'
    });
    const handleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleLoginSpy).toHaveBeenCalledTimes(1);
    expect(props.signupUser).not.toHaveBeenCalled();
  });
  test(`should not call signup user action creator 
  if there is a google login error`, () => {
      const wrapper = setUp();
      const googleSignupSpy = jest.spyOn(
        wrapper.instance(), 'googleSignup'
      );
      const response = {
        error: 'i am an error'
      };
      wrapper.instance().googleSignup(response);
      expect(googleSignupSpy).toHaveBeenCalledTimes(1);
      expect(props.signupUser).not.toHaveBeenCalled();
    });

  test('should call signup user action creator when form is submited', () => {
    const wrapper = setUp();
    const handleSignupSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleSignupSpy).toHaveBeenCalledTimes(1);
    expect(props.signupUser).toHaveBeenCalled();
  });

  test('should call signup user action creator google signup is used', () => {
    const wrapper = setUp();
    const googleSignupSpy = jest.spyOn(
      wrapper.instance(), 'googleSignup'
    );
    const response = {
      profileObj
    };
    wrapper.instance().googleSignup(response);
    expect(googleSignupSpy).toHaveBeenCalledTimes(1);
    expect(props.signupUser).toHaveBeenCalledTimes(2);
  });
});
