import React from 'react';
import {NotFoundPage} from "../../pages/misc/NotFoundPage"
import renderer from 'react-test-renderer';

describe("Not Found Page", function () {
  it('render correctly', () =>{
    const loader = renderer.create(<NotFoundPage/>);
    let tree = loader.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
