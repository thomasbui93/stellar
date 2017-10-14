import React from 'react'
import renderer from 'react-test-renderer'
import {GridIndex} from '../../../components/admingrid/GridIndex'
import {MemoryRouter, Route} from 'react-router';
import {mount} from 'enzyme'
import {expect as expectChai} from 'chai'
import {SearchBox} from "../../../components/admingrid/SearchBox"
import {SorterBox} from "../../../components/admingrid/SorterBox"
import {DataGrid} from "../../../components/admingrid/DataGrid"
import {Pagination} from "../../../components/admingrid/Pagination"
import {Loader} from "../../../components/general/Loader";
import {StaticTag} from "../../../components/general/StaticTag";

describe('GridIndex', () => {
  const removeAction = () => {
    console.log('remove action');
  };

  const requestApi = () => {
    console.log('request api');
  };

  const sortingFields = [{
    value: 'name',
    label: 'Name'
  }, {
    value: 'description',
    label: 'Description'
  }];

  const items = [{
    createdAt: "2017-10-12T15:58:45.164Z",
    description: "Test Tag Description 3",
    isActive: true,
    key: "snake-S16NWzphW",
    name: "Snake",
    updatedAt: "2017-10-12T15:58:45.164Z"
  }, {
    createdAt: "2017-11-12T15:58:45.164Z",
    description: "Test Tag Description 4",
    isActive: true,
    key: "snake-S26NWzphW",
    name: "Snake 1",
    updatedAt: "2017-08-12T15:58:45.164Z"
  }];
  const pagination = {
    next: 3,
    prev: 1
  };

  it('render correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Route exact path="/" render={ props =>{
          return <GridIndex
            error={false}
            isLoading={false}
            requestApi={requestApi}
            removeAction={removeAction}
            sortingFields={sortingFields}
            items={items}
            pagination={pagination}
            location={props.location}
            match={props.match}
          />
        }}>
        </Route>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('render correct sub components', () => {
    const componentNormal = mount(
      <MemoryRouter>
        <Route exact path="/" render={ props =>{
          return <GridIndex
            error={false}
            isLoading={false}
            requestApi={requestApi}
            removeAction={removeAction}
            sortingFields={sortingFields}
            items={items}
            pagination={pagination}
            location={props.location}
            match={props.match}
          />
        }}>
        </Route>
      </MemoryRouter>
    );

    expectChai(componentNormal.find(SearchBox)).to.have.length(1);
    expectChai(componentNormal.find(SorterBox)).to.have.length(1);
    expectChai(componentNormal.find(Pagination)).to.have.length(2);
    expectChai(componentNormal.find(DataGrid)).to.have.length(1);

    const componentLoading = mount(
      <MemoryRouter>
        <Route exact path="/" render={ props =>{
          return <GridIndex
            error={false}
            isLoading={true}
            requestApi={requestApi}
            removeAction={removeAction}
            sortingFields={sortingFields}
            items={items}
            pagination={pagination}
            location={props.location}
            match={props.match}
          />
        }}>
        </Route>
      </MemoryRouter>
    );
    expectChai(componentLoading.find(Loader)).to.have.length(1);

    const componentError = mount(
      <MemoryRouter>
        <Route exact path="/" render={ props =>{
          return <GridIndex
            error={'Sample error'}
            isLoading={false}
            requestApi={requestApi}
            removeAction={removeAction}
            sortingFields={sortingFields}
            items={items}
            pagination={pagination}
            location={props.location}
            match={props.match}
          />
        }}>
        </Route>
      </MemoryRouter>
    );
    expectChai(componentError.find(StaticTag)).to.have.length(1);
  })
});