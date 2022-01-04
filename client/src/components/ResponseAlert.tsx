import React from 'react'
import { Alert } from 'antd'

const type: { [name: string]: 'success' | 'error' | 'warning' } = {
  successed: 'success',
  failed: 'error',
  unknown: 'warning'
}

interface PropsType {
  msg: string;
  detail: string;
  status: 'successed' | 'failed' | 'unknown';
}

const ResponseAlert = ({ msg, detail, status }: PropsType) => {
  return (
    <Alert message={msg} description={detail} type={type[status]} showIcon />
  )
}

export default React.memo(ResponseAlert)
