import React from 'react'
import { CategoryListPage, mapStateToProps } from '../../../pages/category/CategoryListPage'
import CategoryItem from '../../../components/category/CategoryItem'
import CategoryInlineEditor from '../../../components/category/CategoryInlineEditor'
import Loader from '../../../components/general/Loader'
import {mount} from 'enzyme'
import {expect as expectChai} from 'chai'
import {spy} from 'sinon'
import { List, Set } from 'immutable'
import { MemoryRouter } from 'react-router'

describe('CategoryListPage', () => {
  it('should render correctly components', () => {
    const removeCategoryItem = spy()
    const requestCategoryList = spy()
    const updateCategoryItem = spy()
    const createCategoryItem = spy()
    const component = mount(
      <MemoryRouter>
        <CategoryListPage
          categories={[]}
          isLoading={false}
          requestCategoryList={requestCategoryList}
          removeCategoryItem={removeCategoryItem}
          updateCategoryItem={updateCategoryItem}
          createCategoryItem={createCategoryItem}
        />
      </MemoryRouter>
     )

    expectChai(component.find(CategoryItem)).to.have.length(0)
    expectChai(component.find(CategoryInlineEditor)).to.have.length(0)
    component.find('.page-header button').simulate('click')
    expectChai(component.find(CategoryInlineEditor)).to.have.length(1)
  })
})

describe('CategoryListPage', () => {
  it('should render correctly components', () => {
    const removeCategoryItem = spy()
    const requestCategoryList = spy()
    const updateCategoryItem = spy()
    const createCategoryItem = spy()
    const categories = [{
      key: '1',
      title: 'Cat 1',
      isLoading: false,
      disabled: false
    }, {
      key: '2',
      title: 'Cat 2',
      isLoading: true,
      disabled: true
    }]

    const component = mount(
      <MemoryRouter>
        <CategoryListPage
          categories={categories}
          isLoading={false}
          requestCategoryList={requestCategoryList}
          removeCategoryItem={removeCategoryItem}
          updateCategoryItem={updateCategoryItem}
          createCategoryItem={createCategoryItem}
        />
      </MemoryRouter>
     )

    expectChai(component.find(CategoryItem)).to.have.length(1)
    expectChai(component.find(Loader)).to.have.length(0)
    expectChai(component.find(CategoryInlineEditor)).to.have.length(0)
    component.find('.page-header button').simulate('click')
    expectChai(component.find(CategoryInlineEditor)).to.have.length(1)
  })
})

describe('#mapStateToProps test cases', () => {
  it('return categories, isLoading, error combined in a object', () => {
    const categoryList = {
      categories: List([
        {
          key: '1',
          title: 'Cat 1'
        },
        {
          key: '2',
          title: 'Cat 2'
        },
        {
          key: '3',
          title: 'Cat 3'
        },
        {
          key: '4',
          title: 'Cat 4'
        }
      ]),
      isLoading: false,
      error: null
    }

    const categoryRemoval = {
      removingList: Set(['1']),
      removedList: Set(['2'])
    }

    const categoryUpdate = {
      updatingList: Set(['3']),
      updatedCategory: '4'
    }

    const categoryCreate = {
      category: {
        key: '5',
        title: 'Cat 5'
      }
    }

    const originalState = {
      categoryList: categoryList,
      categoryRemoval: categoryRemoval,
      categoryUpdate: categoryUpdate,
      categoryCreate: categoryCreate
    }

    const mappedProps = mapStateToProps(originalState)
    expectChai(mappedProps).to.have.property('error')
    expectChai(mappedProps).to.have.property('isLoading')
    expectChai(mappedProps).to.have.property('categories')
  })
})
