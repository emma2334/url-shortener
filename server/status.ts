/**
 * Generate result info
 *
 * @param      {Status}           status           The state information
 * @param      {string | Detail}  [detail]         Any additional information
 * @param      {string}           [detail.detail]  Detail information
 * @param      {any}              [detail.data]    The result returns from database
 * @param      {any}              [detail.error]   The error message
 * @return     {Result}           The object of result info
 */
export default (status: Status, detail?: string | Detail): Result =>
  typeof detail === 'object' ? { ...status, ...detail } : { ...status, detail }

interface Detail {
  detail?: string;
  data?: any;
  error?: any;
}
export interface Result extends Detail {
  msg: string;
  code: number;
  status: 'unknown' | 'successed' | 'failed';
}

/** Class representing status. */
class Status {
  msg: string;
  code: number;
  status: 'unknown' | 'successed' | 'failed';

  /**
   * Create status
   *
   * @param      {string}           msg        The state information
   * @param      {number}           code       The state code
   * @param      {0 | 1 | boolean}  successed  Is successed or not
   */
  constructor (msg: string, code: number, successed?: 0 | 1 | boolean) {
    this.msg = msg
    this.code = code
    if (successed === 1 || successed === true) {
      this.status = 'successed'
    } else if (successed === 0 || successed === false) {
      this.status = 'failed'
    } else {
      this.status = 'unknown'
    }
  }
}

const SHORTEN_URL = {
  CREATE_SUCCESS: new Status('建立縮網址成功', 1000, true),
  CREATE_FAIL: new Status('建立縮網址失敗', 1001, false),
  GET_METADATA_SUCCESS: new Status('獲取 Open Graph Metadata 成功', 1002, true),
  GET_METADATA_FAIL: new Status('獲取 Open Graph Metadata 失敗', 1003, false),
  FIND_SUCCESS: new Status('查找縮網址成功', 1004, true),
  FIND_FAIL: new Status('查找縮網址失敗', 1005, false),
  UPDATE_SUCCESS: new Status('更新縮網址內容成功', 1006, true),
  UPDATE_FAIL: new Status('更新縮網址內容失敗', 1007, false),
  UPDATE_VIEW_COUNT_SUCCESS: new Status('更新瀏覽次數成功', 1008, true),
  UPDATE_VIEW_COUNT_FAIL: new Status('更新瀏覽次數失敗', 1009, false)
}

export const code = { SHORTEN_URL }
