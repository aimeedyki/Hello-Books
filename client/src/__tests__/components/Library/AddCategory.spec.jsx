import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedAddCategory,
{ AddCategory } from '../../../components/Library/AddCategory';

const addNewCategory = jest.fn(() => Promise.resolve(true));
const clearErrorMessage = jest.fn();
const imageUpload = jest.fn(() => ({ end: jest.fn((err, res) => { }) }));
const getCategories = jest.fn();
const categories = [{ id: 1, name: 'romance' }, { id: 2, name: 'thriller' }];

const errorMessage = '';
const props = {
  errorMessage,
  clearErrorMessage,
  addNewCategory
};
const store = mockStore({ CategoryReducer: { error: errorMessage } });

const setUp = () => shallow(<AddCategory { ...props } />);

describe('Connected AddCategory component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedAddCategory store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('AddCategorycomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should contain heading for add category page', () => {
    const wrapper = setUp();
    expect(wrapper.find('h5').text()).toBe('Add A New Category');
  });
  test(`should call handleChange when there is a change in any field 
  and set its value to state`, () => {
      const wrapper = setUp();
      const handleChangeSpy = jest.spyOn(
        wrapper.instance(), 'handleChange'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'name', value: 'a Category' }
      };
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().state.name).toBe('a Category');
    });

  test('should call addCategory user when form is submited', () => {
    const wrapper = setUp();
    const handleFormSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    expect(props.addNewCategory).toHaveBeenCalled();
  });
});
