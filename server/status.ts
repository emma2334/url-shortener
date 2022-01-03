/**
 * Generate result info
 *
 * @param      {Status}           status         The state information
 * @param      {string | Detail}  detail         Any additional information
 * @param      {string}           detail.detail  Detail information
 * @param      {any}              detail.result  The result returns from database
 * @param      {any}              detail.error   The error message
 * @return     {Result}  The object of result info
 */
export default (status: Status, detail?: string | Detail): Result =>
  typeof detail === 'object' ? { ...status, ...detail } : { ...status, detail }

interface Detail {
  detail?: string;
  result?: any;
  error?: any;
}
export interface Result extends Detail {
  msg: string;
  code: number;
}

/** Class representing status. */
class Status {
  msg: string;
  code: number;

  /**
   * Create status
   *
   * @param      {string}  msg     The state information
   * @param      {number}  code    The state code
   */
  constructor (msg: string, code: number) {
    this.msg = msg
    this.code = code
  }
}

const SHORTEN_URL = {
  CREATE_SUCCESS: new Status('建立縮網址成功', 1000),
  CREATE_FAIL: new Status('建立縮網址失敗', 1001)
}

export const code = { SHORTEN_URL }
