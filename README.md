# Nabiclient

![nabiclient](./logo.png)

NATS 客戶端

特色：

* 漂亮的介面
* 跨 Windows、 Mac 平台
* 支援 NATS 和 NATS Streaming

載點： [Github Releases](https://github.com/marco79423/nabiclient/releases)

## 開發

### 本地測試

```bash

# 執行本地的 NATS
sudo docker run -p 4222:4222 -p 8222:8222 -ti nats:latest

# 執行本地的 NATS Streaming
sudo docker run -p 4222:4222 -p 8222:8222 -ti nats-streaming:latest


# 執行本地的 NATS (使用 JetStream)
sudo docker run -p 4222:4222 -p 8222:8222 -ti nats:latest --js
```
