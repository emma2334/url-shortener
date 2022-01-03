// @ts-ignore
import ogs from 'open-graph-scraper'
import { URL } from '../models'
import status, { code, Result } from '../status'

/**
 * Create shorten link
 *
 * @param      {string}  url     The url
 * @return     {object}  The object of result info
 */
async function create (url: string): Promise<Result> {
  try {
    const og = await ogs({ url })
    const { ogTitle, ogType, ogImage, ogUrl, ogDescription, favicon } =
      og.result

    const result = await URL.findOrCreate({
      where: { url },
      defaults: {
        ogTitle,
        ogType,
        ogImage: ogImage?.url,
        ogUrl,
        ogDescription,
        favicon
      }
    })
    return status(code.SHORTEN_URL.CREATE_SUCCESS, { result: result[0] })
  } catch (e) {
    return status(code.SHORTEN_URL.CREATE_FAIL, { error: e })
  }
}

export default { create }
