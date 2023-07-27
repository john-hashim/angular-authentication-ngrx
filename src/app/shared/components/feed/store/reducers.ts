import {createFeature, createReducer, on} from '@ngrx/store'
import {FeedStateInterface} from '../types/feedState.interface'
import {feedActions} from './actions'
import {routerNavigatedAction} from '@ngrx/router-store'

export const initialState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null,
}

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(feedActions.getFeedSuccess, (state, action) => ({
      ...state,
      data: action.feed,
      isLoading: false,
      error: null,
    })),
    on(feedActions.getFeedFailure, (state, action) => ({
      ...state,
      data: null,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
})

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectData: selectFeedData,
  selectError,
} = feedFeature
