import React from 'react';
import {Loader} from "../../../components/general/Loader";
import renderer from 'react-test-renderer';

it('render correctly', () =>{
  const loader = renderer.create(<Loader/>);
  let tree = loader.toJSON();
  expect(tree).toMatchSnapshot();
});