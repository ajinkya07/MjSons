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

import {strings} from '@values/strings';
import axios from 'axios';
import {urls} from '@api/urls';

const header = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};

export function showLoadingIndicator(type) {
  return {
    type: type,
  };
}

export function onSuccess(data, type) {
  return {
    data,
    type: type,
  };
}

export function onFailure(error, type) {
  return {
    type: type,
    error,
  };
}

export function getExclusiveList(data) {
  console.log('getExclusiveList', data);

  return dispatch => {
    dispatch(showLoadingIndicator(EXCLUSIVE_DATA));

    axios
      .post(urls.Exclusive.url, data, header)
      .then(response => {
        if (response.data.ack === '1') {
          dispatch(onSuccess(response.data, EXCLUSIVE_DATA_SUCCESS));
        } else {
          dispatch(onFailure(response.data.msg, EXCLUSIVE_DATA_ERROR));
        }
      })
      .catch(function (error) {
        dispatch(onFailure(strings.serverFailedMsg, EXCLUSIVE_DATA_ERROR));
      });
  };
}

export function getReadyStockCount(data) {
  console.log('getReadyStockCount', data);

  return dispatch => {
    dispatch(showLoadingIndicator(READY_STOCK_COUNT_DATA));

    axios
      .post(urls.ReadyStockCount.url, data, header)
      .then(response => {
        console.log('getReadyStockCount res', response.data);

        if (response.data.ack === '1') {
          dispatch(onSuccess(response.data, READY_STOCK_COUNT_DATA_SUCCESS));
        } else {
          dispatch(onFailure(response.data.msg, READY_STOCK_COUNT_DATA_ERROR));
        }
      })
      .catch(function (error) {
        console.log('getReadyStockCount rerrores', error);

        dispatch(
          onFailure(strings.serverFailedMsg, READY_STOCK_COUNT_DATA_ERROR),
        );
      });
  };
}
