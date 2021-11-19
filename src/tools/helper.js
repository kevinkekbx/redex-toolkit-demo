import React from 'react';
import { includes } from 'lodash';
import { createBrowserHistory } from 'history';
import { Route } from 'react-router-dom';
import axios from 'axios';
// import cookie from 'react-cookie';
import { message } from 'antd';
import moment from 'moment';

export const baseName = '/';
export const history = createBrowserHistory({ baseName });

// 根据url判获取网关地址
const getGatewayURL = () => {
  const curEnv = 'development';
  const GATEWAY_URL = {
    development: 'https://gate.dev.porsche-preview.cn'
  };

  return GATEWAY_URL[curEnv];
};

export const GETWAY = getGatewayURL();

/**
 * @param [array] argu
 */
export const windowOpen = (...argu) => {
  const url = `${baseName}${argu[0]}`;
  argu.shift();
  return window.open(url, ...argu);
};
export const scrollToTop = () => window.scrollTo(0, 0);
export const closePage = () => {
  window.opener = null;
  window.open('', '_self');
  window.close();
};


export const API_VERSION = 'v1';

// the authorize algorithm goes here
export const authorized = (allowed, currentRole) => includes(allowed, currentRole);

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
const axiosInstance = axios.create({
  baseURL: GETWAY,
  timeout: 500000,
  headers: { Authorization: 'Bearer 098577c4-4476-41e7-bc34-ffe099e85717' }, // (cookie).load('X-CSRF-TOKEN')},
  withCredentials: true,
  responseType: 'json',
  // proxy: {
  //   host: '',
  //   port: 8888
  // }
});

export const convertHumpToLine = name => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const convertSortOrder = order => {
  return order === 'ascend' ? 'asc' : 'desc';
};

export const dateFormatTypes = {
  hyphenDate: 'YYYY-MM-DD',
  hyphenMinsTime: 'YYYY-MM-DD HH:mm',
  hyphenTime: 'YYYY-MM-DD HH:mm:ss',
  slashDate: 'YYYY/MM/DD',
  slashTime: 'YYYY/MM/DD HH:mm:ss',
  chDate: 'YYYY年MM月DD日',
  chTime: 'YYYY年MM月DD日 HH:mm:ss',
  chMinsTime: 'YYYY年MM月DD日 HH:mm',
  chDTime: 'HH:mm',
};

export const dateFormat = (timestamp, format = 'YYYY/MM/DD') => {
  if (!timestamp) return;
  return moment(new Date(timestamp * 1000)).format(format);
};

export const dateFormatForPicker = (timestamp, format) => {
  if (!timestamp) return;
  return moment(timestamp, format);
};

// disable before date for datePicker
export const disabledBeforeDate = currentDate => {
  if (!currentDate) {
    return false;
  }
  const today = moment().format('L');
  return moment(currentDate.format('YYYY-MM-DD')).isBefore(today);
};

export const download = (blob, fileName) => {
  if (!blob) return;
  fileName = decodeURIComponent(fileName);
  if (window.navigator.msSaveOrOpenBlob) {
    // Compatible with IE10
    navigator.msSaveBlob(blob, fileName);
  } else {
    //  Chrome/Firefox
    downloadByUrl(URL.createObjectURL(blob), fileName);
  }
};

export const downloadByUrl = (url, fileName) => {
  if (!url) return;
  let aTag = document.createElement('a');
  aTag.download = fileName;
  aTag.href = url;
  aTag.click();
  URL.revokeObjectURL(aTag.href);
};

export const toQueryParam = queryParams => {
  const params = new URLSearchParams();
  Object.keys(queryParams).forEach(key => {
    if (typeof queryParams[key] !== 'undefined' && queryParams[key] !== null) {
      params.append(key, queryParams[key]);
    }
  });
  return params;
};

export const queryObject = () => {
  let q = {};
  window.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  return q;
};

/**
 *
 * @param {*} queryStr name=Mike&age=20
 * return object {name: "Mike", age: 20}
 */
export const queryObjectByStr = queryStr => {
  let q = {};
  if (!queryStr) {
    return q;
  }
  queryStr.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  for (let key in q) {
    q[key] = q[key] === 'null' ? null : q[key];
  }
  return q;
};

export const SERVICES = {
  Sales: 'drs-sales-service/v1',
  SalesV2: 'drs-sales-service/v2',
  AfterSales: 'drs-aftersales-service/v1',
  Customer: 'drs-customer-service/v1',
  MobileBff: 'drs-mobile-bff/v1',
  UserCenterAuth: 'ss-usercenter/oauth',
  Permission: 'drs-sales-service',
  pfsService: 'drs-finance-service/v1',
  FlowService: 'drs-flow-service/v1',
  DocumentService: 'drs-document-service/v1',
  SharedService: 'drs-shared-service',
  PfsFinancialService: 'pfs-financial-service/v1',
};

export const highlightKeyword = (str, key) => {
  if (!str) return '';
  let reg = new RegExp('(' + key + ')', 'gi');
  let newstr = str.replace(reg, '<em class="heightlight-kd">$1</em>');
  return newstr;
};

export const urlShim = url => {
  if (Array.isArray(url)) {
    return url.join('/');
  } else {
    return `${SERVICES.Sales}/${url}`;
  }
};

export const titleCase = str => {
  if (!str) return '';
  let arr = str.toLowerCase().split(' ');
  for (let i = 0; i < arr.length; i++) {
    let char = arr[i].charAt(0);
    arr[i] = arr[i].replace(char, function replace(c) {
      return c.toUpperCase();
    });
  }
  return arr.join(' ');
};

// 修改请求Accept，处理java监控报错
export function changeRequestAccept(config) {
  if (config.url.includes('/esign/contractView')) {
    config.headers = { ...config.headers, Accept: '*/*' };
  }
}

axiosInstance.interceptors.request.use(
  function (config) {
   

    changeRequestAccept(config);
    let headers = Object.assign({}, config.headers, {
      Authorization: 'Brea aaaa121',
    });
    return Object.assign({}, config, { headers });
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // TODO:
    
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 读取blob、arraybuffer格式的流文件
export const readFile = async (data, type = '', allowEmpty = true) =>
  new Promise((resolve, reject) => {
    if (['blob', 'arraybuffer'].includes(type)) {
      var reader = new FileReader();
      reader.readAsText(type === 'blob' ? data : new Blob([data]), 'utf-8');
      reader.onload = function (evt) {
        // 上传文件时允许返回的数据为空
        if (!allowEmpty && !evt.target.result) {
          resolve({ code: '0' });
          return;
        }
        try {
          // 如果服务器返回的是object字符串，说明下载文件有问题
          const obj = JSON.parse(evt.target.result);
          if (obj.code === '0') {
            resolve(data);
          } else {
            reject({ response: { data: obj } });
          }
        } catch (err) {
          resolve(data);
        }
      };
    } else {
      resolve(data);
    }
  });

const CANCEL_TOKEN = axios.CancelToken;
const crashRequestList = [];

export const formatErrorMessage = msg => {
  let errorMsg = (msg + '').toLocaleLowerCase() || 'internal_error';
  let errorText = '服务异常，请稍后再试。';
  
  return errorText || msg;
};

export const api = {
  /**
   * @param: url
   * @param: method: get | post | put | delete | head | options | patch
   * @param: headers
   * @param: queryParams
   * ...: responseType/
   */
  request: argu => {
    let config = {};
    const { url, method, queryParams, data: res, ...rest } = argu;
    if (!argu.url) {
      throw new Error('No request url');
    } else {
      config.url = url;
    }
    if (argu.method) {
      config.method = method;
    }
    if (queryParams) {
      config.params = toQueryParam(queryParams);
    }
    if (res) {
      config.data = res;
    }
    config = Object.assign({}, config, { ...rest });
    if (argu.canCrash) {
      config.cancelToken = new CANCEL_TOKEN(cancel =>
        crashRequestList.push({ key: config.url, cancel })
      );
    }
    return axiosInstance
      .request(config)
      .then(res => {
        
        return readFile(res.data, config.responseType);
      })
      .catch(err => {
       
        if (err.response) {
          const data = err.response.data;
          console.log('error:'+data)
        } else {
          message.error(formatErrorMessage('internal_error'));
        }
        return Promise.reject(err);
      });
  },

  get: (url, queryParams = {}, config) => {
    return api.request({
      url: urlShim(url),
      queryParams: queryParams,
      ...config,
    });
  },

  post: (url, data, config, queryParams = {}) => {
    return api.request({
      url: urlShim(url),
      method: 'post',
      queryParams: queryParams,
      data: data,
      ...config,
    });
  },

  put: (url, data, config) => {
    return api.request({
      url: urlShim(url),
      method: 'put',
      data: data,
      ...config,
    });
  },
  patch: (url, data, config) => {
    return api.request({
      url: urlShim(url),
      method: 'patch',
      data: data,
      ...config,
    });
  },
  delete: (url, data, config) => {
    return api.request({
      url: urlShim(url),
      method: 'delete',
      data: data,
      ...config,
    });
  },

  // Be careful to use this function
  changeGlobalAxiosInstance: params => {
    Object.keys(params).forEach(element => {
      axiosInstance.defaults[element] = params[element];
    });
  },
};

export const handleCrashRequest = (key = '') => {
  if (key) {
    const _key = key instanceof Array ? urlShim(key) : key;
    for (let i = 0, length = crashRequestList.length; i < length; i++) {
      if (crashRequestList[i].key === _key) {
        crashRequestList[i].cancel();
        crashRequestList.splice(i, 1);
        break;
      }
    }
  } else {
    crashRequestList.forEach(item => item.cancel());
    crashRequestList.length = 0;
  }
};
