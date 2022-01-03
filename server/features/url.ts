// @ts-ignore
import ogs from 'open-graph-scraper'
import { Sequelize } from 'sequelize'
import { URL } from '../models'
import status, { code, Result } from '../status'

/**
 * Create shorten link
 *
 * @param      {string}           url     The url
 * @return     {Promise<Result>}  The object of result info
 */
async function create (url: string): Promise<Result> {
  try {
    const target = await URL.findOne({ where: { url } })
    if (target) {
      // Return target if exists
      return status(code.SHORTEN_URL.FIND_SUCCESS, {
        data: target,
        detail: '網址已存在'
      })
    } else {
      // Get metadata then creat shorten url
      const og = await getMetadata(url)
      const result = await URL.create({
        url,
        ...og.data
      })
      return status(code.SHORTEN_URL.CREATE_SUCCESS, { data: result })
    }
  } catch (e) {
    return status(code.SHORTEN_URL.CREATE_FAIL, { error: e })
  }
}

/**
 * Find all urls that match the query
 *
 * @param      {Object}           query   The query
 * @return     {Promise<Result>}  The object of result info
 */
async function find (query: object = {}): Promise<Result> {
  try {
    return status(code.SHORTEN_URL.FIND_SUCCESS, {
      data: await URL.findAll({ where: query })
    })
  } catch (e) {
    return status(code.SHORTEN_URL.FIND_FAIL, { error: e })
  }
}

/**
 * Finds the first url that matches the query
 *
 * @param      {Object}           query   The query
 * @return     {Promise<Result>}  The object of result info
 */
async function findOne (query: object): Promise<Result> {
  try {
    return status(code.SHORTEN_URL.FIND_SUCCESS, {
      data: await URL.findOne({ where: query })
    })
  } catch (e) {
    return status(code.SHORTEN_URL.FIND_FAIL, { error: e })
  }
}

/**
 * Updates url data
 *
 * @param      {Object}           arg1              The argument 1
 * @param      {Object}           arg1.update       Values to update
 * @param      {Object}           arg1.query={}     The searching query
 * @param      {Array}            [arg1.fields]     Fields to update
 * @param      {boolean | Array}  [arg1.returning]  Whether to append returning
 * @param      {boolean}          [arg1.silent]     Whether to update updatedAt timestamp
 * @return     {Promise<Result>}  The object of result info
 */
async function update ({
  update,
  query = {},
  ...options
}: {
  update: object;
  query: object;
  fields?: string[];
  returning?: boolean | string[];
  silent?: boolean;
}): Promise<Result> {
  try {
    const result = await URL.update(update, {
      where: query,
      returning: true,
      ...options
    })

    return status(code.SHORTEN_URL.UPDATE_SUCCESS, {
      data: result[1]
    })
  } catch (e) {
    return status(code.SHORTEN_URL.UPDATE_FAIL, {
      error: e
    })
  }
}

/**
 * Get open graph metadata.
 *
 * @param      {string}           url     The url
 * @return     {Promise<Result>}  The result of requesting open graph metadata.
 */
async function getMetadata (url: string): Promise<Result> {
  const og = await ogs({ url })
  const { ogTitle, ogType, ogImage, ogUrl, ogDescription, favicon } = og.result
  return status(code.SHORTEN_URL.GET_METADATA_SUCCESS, {
    data: {
      ogTitle,
      ogType,
      ogImage: ogImage?.url,
      ogUrl,
      ogDescription,
      favicon
    }
  })
}

/**
 * Update view count
 *
 * @param      {number | string}  id      The identifier
 * @return     {Promise<Result>}  The object of result info
 */
async function view (id: number | string): Promise<Result> {
  try {
    const result = await update({
      update: { view: Sequelize.literal('view + 1') },
      query: { id },
      silent: true
    })

    return result.data[0]
      ? status(code.SHORTEN_URL.UPDATE_VIEW_COUNT_SUCCESS, {
        data: result.data[0]
      })
      : status(code.SHORTEN_URL.UPDATE_VIEW_COUNT_FAIL, {
        error: '找不到對應縮網址'
      })
  } catch (e) {
    return status(code.SHORTEN_URL.UPDATE_VIEW_COUNT_FAIL, {
      error: e
    })
  }
}

export default { create, find, findOne, update, view }
