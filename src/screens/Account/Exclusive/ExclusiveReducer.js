import {
  EXCLUSIVE_DATA,
  EXCLUSIVE_DATA_SUCCESS,
  EXCLUSIVE_DATA_ERROR,
  EXCLUSIVE_DATA_RESET_REDUCER,
  READY_STOCK_COUNT_DATA,
  READY_STOCK_COUNT_DATA_SUCCESS,
  READY_STOCK_COUNT_DATA_ERROR,
  READY_STOCK_COUNT_DATA_RESET_REDUCER,
} from '@redux/types';

const initialState = {
  isFetching: false,
  error: false,
  errorMsg: '',
  successExclusiveVersion: 0,
  errorExclusiveVersion: 0,
  exclusiveData: [],

  successReadyStockVersion: 0,
  errorReadyStockVersion: 0,
  readyStockCountData: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case EXCLUSIVE_DATA:
      return {
        ...state,
        isFetching: true,
      };

    case EXCLUSIVE_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        isFetching: false,
        exclusiveData: action.data,
        successExclusiveVersion: ++state.successExclusiveVersion,
        error: false,
      };

    case EXCLUSIVE_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        exclusiveData: [],
        errorExclusiveVersion: ++state.errorExclusiveVersion,
      };

    case EXCLUSIVE_DATA_RESET_REDUCER:
      return initialState;

    case READY_STOCK_COUNT_DATA:
      return {
        ...state,
        isFetching: true,
      };

    case READY_STOCK_COUNT_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        isFetching: false,
        readyStockCountData: action.data.data,
        successReadyStockVersion: ++state.successReadyStockVersion,
        error: false,
      };

    case READY_STOCK_COUNT_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        readyStockCountData: [],
        errorReadyStockVersion: ++state.errorReadyStockVersion,
      };

    case READY_STOCK_COUNT_DATA_RESET_REDUCER:
      return initialState;

    default:
      return state;
  }
}
