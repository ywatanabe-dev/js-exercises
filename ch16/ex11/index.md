### 複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか

macOS 14.7で確認。
サーバを立ち上げた後にclient.jsを実行すると、実行タイミングによっても異なるが、
15000〜16000程度のクライアントが接続してから以下エラーが発生する。

```
{
  errno: -35,
  code: 'EAGAIN',
  syscall: 'connect',
  address: '::1',
  port: 8000
}
```

上記のメッセージは`connect`システムコールで`EAGAIN`エラーが起きていることを示しているが、macOSの`connect`のマニュアルでは`EAGAIN`について触れられていない。そこで、別のUnix like OSのマニュアルを参照すると、

> An auto-assigned port number was requested but no auto-assigned ports are available.
>
> (FreeBSD CONNECT(2)[1]より)

とあることから、クライアント側に割り当てるポートが枯渇したことによって接続が確立できなくなったと考えられる。

[1]: https://man.freebsd.org/cgi/man.cgi?connect
