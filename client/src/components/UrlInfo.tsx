import React from 'react'
import { Skeleton, Descriptions, Typography, Avatar, Image } from 'antd'
import { absoluteUrl } from 'utils/api'
const { Item } = Descriptions

interface PropsType {
  loading: boolean;
  data: { [key: string]: any };
}

const UrlInfo = ({ loading, data }: PropsType) => {
  return (
    <div>
      {
        <Skeleton loading={loading} active>
          {data && (
            <Descriptions
              title="網址訊息"
              bordered
              column={1}
              contentStyle={{ background: '#fff' }}
            >
              <Item label="縮網址">
                <Typography.Paragraph copyable>
                  {absoluteUrl(data.id)}
                </Typography.Paragraph>
              </Item>
              <Item label="原網址">
                <a href={data.url}>{data.url}</a>
              </Item>
              <Item label="瀏覽次數">{data.view}</Item>
              <Item label="標題">
                <Avatar size="small" shape="square" src={data.favicon} />
                &nbsp;
                {data.ogTitle}
              </Item>
              <Item label="網頁類型">{data.ogType}</Item>
              <Item label="敘述">{data.ogDescription}</Item>
              <Item label="縮圖">
                <Image src={data.ogImage} />
              </Item>
              <Item label="建立日期">
                {new Date(data.createdAt).toLocaleString()}
              </Item>
            </Descriptions>
          )}
        </Skeleton>
      }
    </div>
  )
}

export default React.memo(UrlInfo)
