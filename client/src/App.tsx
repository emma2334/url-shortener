import React from 'react'
import { Layout } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Container from 'components/Container'
import Home from 'pages/Home'
import style from 'App.module.css'

const App = () => {
  return (
    <Layout className={style.layout}>
      <Layout.Header className={style.header}>
        <Container>
          <div className={style.title}>縮網址</div>
        </Container>
      </Layout.Header>
      <Layout.Content className={style.content}>
        <Container className={style.container}>
          <Home />
        </Container>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <a href="https://github.com/emma2334/url-shortener">
          View on GitHub&nbsp;
          <GithubOutlined />
        </a>
      </Layout.Footer>
    </Layout>
  )
}

export default React.memo(App)
