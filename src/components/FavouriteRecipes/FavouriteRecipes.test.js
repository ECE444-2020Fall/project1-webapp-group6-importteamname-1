import React from 'react';
import FavouriteRecipes from './FavouriteRecipes';

import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
configure({ adapter: new Adapter() });

describe('FavouriteRecipes', () => {
    it("renders FavouriteRecipes without crashing", () => {
        const FavouriteRecipesPage = shallow(<FavouriteRecipes />);
        expect(FavouriteRecipesPage).toMatchSnapshot();
    });

    it("renders <React.Fragment />", () => {
        const FavouriteRecipesPage = shallow(<FavouriteRecipes />);
        expect(FavouriteRecipesPage.find('h3').text()).toEqual("Favourite Recipes");
    });
});


  
