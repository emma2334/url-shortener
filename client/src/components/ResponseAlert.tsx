import React from 'react'
import { Alert } from 'antd'

const type: { [name: string]: 'success' | 'error' | 'warning' } = {
  successed: 'success',
  failed: 'error',
  unknown: 'warning'
}

interface PropsType {
  status: 'successed' | 'failed' | 'unknown';
  msg: string;
  detail?: string;
  error?: object;
}

const ResponseAlert = ({ msg, detail, status, error }: PropsType) => {
  return (
    <Alert
      style={{ marginBottom: '16px' }}
      message={msg}
      description={
        <>
          {detail && <span>{detail}</span>}
          {error && <span>{JSON.stringify(error)}</span>}
        </>
      }
      type={type[status]}
      showIcon
    />
  )
}

export default React.memo(ResponseAlert)
