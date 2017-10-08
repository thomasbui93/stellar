import React from 'react';
import {NotFoundPage} from "../../pages/misc/NotFoundPage"
import renderer from 'react-test-renderer';

describe("Not Found Page", function () {
  it('render correctly', () =>{
    const component = renderer.create(<NotFoundPage/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
