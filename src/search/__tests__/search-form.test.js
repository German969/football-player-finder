import React from 'react';
import { SearchForm } from '../search-form';
import positions from '../positions';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill';

jest.mock("../positions", () => (
    ["testPos1", "testPos2"]
), { virtual: true });

describe("Search Form", () => {
  Enzyme.configure({ adapter: new Adapter() });

  function SearchFormSetup() {
    const SearchFormProps = {
      filters: {
        name: "",
        position: "Position",
        age: ""
      },
      applyFilters: jest.fn()
    };

    const SearchFormWrapper = mount(<SearchForm {...SearchFormProps} />);

    return {
      SearchFormProps,
      SearchFormWrapper
    }
  }

  const { SearchFormWrapper, SearchFormProps } = SearchFormSetup();

  const form = SearchFormWrapper.find("Form");
  const formControls = SearchFormWrapper.find("FormControl");
  const playerNameFormControl = formControls.at(0);
  const positionFormControl = formControls.at(1);
  const ageFormControl = formControls.at(2);
  const button = SearchFormWrapper.find("Button");

  it("should render form controls with default props", () => {
    expect(form.hasClass("search-form")).toBeTruthy();
    expect(formControls).toHaveLength(3);
    expect(playerNameFormControl.props()).toMatchObject({
      type: "text",
      placeholder: "Player Name",
      value: ""
    });
    expect(positionFormControl.props()).toMatchObject({
      as: "select",
      value: "Position"
    });
    expect(ageFormControl.props()).toMatchObject({
      type: "number",
      placeholder: "Age",
      value: ""
    });
    expect(button.props()).toMatchObject({
      variant: "primary",
      type: "submit"
    });
    expect(button.text()).toBe("Search");
  });

  it("should render positions options", () => {
    const options = SearchFormWrapper.find("option");

    expect(options.length).toBe(3);
    expect(options.at(0).props()).toHaveProperty("disabled");
    expect(options.at(0).text()).toBe("Position");
    expect(options.at(1).props()).toHaveProperty("value", "testPos1");
    expect(options.at(1).text()).toBe("testPos1");
    expect(options.at(2).props()).toHaveProperty("value", "testPos2");
    expect(options.at(2).text()).toBe("testPos2");
  });

  describe('when changing input values', () => {
    const form = SearchFormWrapper.find("form");
    const inputs = SearchFormWrapper.find("input");
    const playerNameInput = inputs.at(0);
    const positionInput = SearchFormWrapper.find("select");
    const ageInput = inputs.at(1);

    it('should handle player name change', () => {
      playerNameInput.simulate("change", { target: { value: 'testName' } });

      expect(playerNameInput.instance().value).toBe('testName');
    });

    it('should handle position change', () => {
      positionInput.simulate("change", { target: { value: 'testPos2' } });

      expect(positionInput.instance().value).toBe('testPos2');
    });

    it('should handle age change', () => {
      ageInput.simulate("change", { target: { value: 10 } });

      expect(ageInput.instance().value).toBe("10");
    });

    it("should apply filters when submitting form", () => {
      const mockName = 'testName';
      const mockPosition = 'testPos2';
      const mockAge = 10;
      const expectedFilters = {
        name: mockName,
        position: mockPosition,
        age: mockAge
      };

      playerNameInput.simulate("change", { target: { value: mockName } });
      positionInput.simulate("change", { target: { value: mockPosition } });
      ageInput.simulate("change", { target: { value: mockAge } });

      form.simulate("submit");

      expect(SearchFormProps.applyFilters).toHaveBeenCalledWith(expectedFilters);
    });
  });
});