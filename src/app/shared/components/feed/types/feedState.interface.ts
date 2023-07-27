import {GetFeedResponseInterface} from './getFeedResponce.interface'

export interface FeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetFeedResponseInterface | null
}
