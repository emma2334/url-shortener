/**
 * Generate result info
 *
 * @param      {Status}             code           The state code
 * @param      {string | Object}    detail         Any additional information
 * @param      {Object | Object[]}  detail.result  The result returns from
 *                                                 database
 * @return     {Object}             The object of result info
 */
export default (code: Status, detail?: string | object): object =>
  typeof detail === 'object' ? { ...code, ...detail } : { ...code, detail }

class Status {
  msg: string;
  code: number;

  constructor (msg: string, code: number) {
    this.code = code
    this.msg = msg
  }
}

const SHORTEN_URL = {
  CREATE_SUCCESS: new Status('建立縮網址成功', 1000),
  CREATE_FAIL: new Status('建立縮網址失敗', 1001)
}

export const code = { SHORTEN_URL }
