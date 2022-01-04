import React, { useState } from 'react'
import { post } from 'utils/api'
import ResponseAlert from 'components/ResponseAlert'
import UrlInput from 'components/UrlInput'
import UrlInfo from 'components/UrlInfo'

const Home = () => {
  const [urlInfo, setUrlInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const onFinish = ({ url }: { url: string }) => {
    setLoading(true)
    post('/api/url', { url }).then((res) => {
      setLoading(false)
      setUrlInfo(res)
      console.log(res)
    })
  }

  return (
    <>
      <UrlInput onFinish={onFinish} buttonDisabled={loading} />
      {!loading && urlInfo.code && <ResponseAlert {...urlInfo} />}
      {(loading || urlInfo.data) && (
        <UrlInfo loading={loading} data={urlInfo.data} />
      )}
    </>
  )
}

export default React.memo(Home)
