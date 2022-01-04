import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { post } from 'utils/api'
import ResponseAlert from 'components/ResponseAlert'

const Home = () => {
  const [urlInfo, setUrlInfo] = useState<any>({})
  const onFinish = async ({ url }: { url: string }) => {
    url &&
      post('/api/url', { url }).then((res) => {
        setUrlInfo(res)
        console.log(res)
      })
  }

  return (
    <>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item
          name="url"
          rules={[
            {
              required: true,
              pattern:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi,
              message: '請確保網址格式正確，例如：https://github.com/'
            }
          ]}
        >
          <Input placeholder="網址" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {urlInfo.code && <ResponseAlert {...urlInfo} />}
    </>
  )
}

export default React.memo(Home)
