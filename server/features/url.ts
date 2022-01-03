// @ts-ignore
import ogs from 'open-graph-scraper'
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
        result: target,
        detail: '網址已存在'
      })
    } else {
      // Get metadata then creat shorten url
      const og = await getMetadata(url)
      const result = await URL.create({
        url,
        ...og.result
      })
      return status(code.SHORTEN_URL.CREATE_SUCCESS, { result })
    }
  } catch (e) {
    return status(code.SHORTEN_URL.CREATE_FAIL, { error: e })
  }
}

/**
 * Find all urls that match the query
 *
 * @param      {object}           query   The query
 * @return     {Promise<Result>}  The object of result info
 */
async function find (query: object = {}): Promise<Result> {
  try {
    return status(code.SHORTEN_URL.FIND_SUCCESS, {
      result: await URL.findAll({ where: query })
    })
  } catch (e) {
    return status(code.SHORTEN_URL.FIND_FAIL, { error: e })
  }
}

/**
 * Finds the first url that matches the query
 *
 * @param      {object}           query   The query
 * @return     {Promise<Result>}  The object of result info
 */
async function findOne (query: object): Promise<Result> {
  try {
    return status(code.SHORTEN_URL.FIND_SUCCESS, {
      result: await URL.findOne({ where: query })
    })
  } catch (e) {
    return status(code.SHORTEN_URL.FIND_FAIL, { error: e })
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
    result: {
      ogTitle,
      ogType,
      ogImage: ogImage?.url,
      ogUrl,
      ogDescription,
      favicon
    }
  })
}

export default { create, find, findOne }
