import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { post } from 'utils/api'

const Home = () => {
  const [urlInfo, setUrlInfo] = useState({})
  const onFinish = async ({ url }: { url: string }) => {
    url && setUrlInfo(await post('/api/url', { url }))
    console.log(urlInfo)
  }

  return (
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
  )
}

export default React.memo(Home)
