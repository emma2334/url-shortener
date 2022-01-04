import React from 'react'
import cx from 'classnames'
import { Form, Input, Button } from 'antd'

import style from './index.module.css'

interface PropsType {
  onFinish: (values: any) => void;
  buttonDisabled?: boolean;
}

const UrlInput = ({ onFinish, buttonDisabled }: PropsType) => {
  return (
    <Form className={style.form} layout="inline" onFinish={onFinish}>
      <Form.Item
        className={cx(style.input, style.formItem)}
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
        <Input size="large" placeholder="網址" allowClear />
      </Form.Item>
      <Form.Item className={style.formItem}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          disabled={buttonDisabled}
        >
          建立縮網址
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(UrlInput)
