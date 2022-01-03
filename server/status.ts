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
  CREATE_FAIL: new Status('建立縮網址失敗', 1001),
  GET_METADATA_SUCCESS: new Status('獲取 Open Graph Metadata 成功', 1002),
  GET_METADATA_FAIL: new Status('獲取 Open Graph Metadata 失敗', 1003),
  FIND_SUCCESS: new Status('查找縮網址成功', 1004),
  FIND_FAIL: new Status('查找縮網址失敗', 1005),
  UPDATE_SUCCESS: new Status('更新縮網址內容成功', 1006),
  UPDATE_FAIL: new Status('更新縮網址內容失敗', 1007),
  UPDATE_VIEW_COUNT_SUCCESS: new Status('更新瀏覽次數成功', 1008),
  UPDATE_VIEW_COUNT_FAIL: new Status('更新瀏覽次數失敗', 1009)
}

export const code = { SHORTEN_URL }
