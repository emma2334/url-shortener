import React from 'react'
import cx from 'classnames'

import style from './index.module.css'

interface PropsType {
  className?: string;
  children?: React.ReactNode;
}

const Container = ({ className, children }: PropsType) => {
  return <div className={cx(style.container, className)}>{children}</div>
}

export default React.memo(Container)
