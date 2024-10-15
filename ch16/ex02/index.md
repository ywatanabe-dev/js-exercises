### Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か

AmazonECS[1]の例を挙げる。AmazonECSのエージェントは、タスクが停止すると各コンテナのエントリプロセス (通常は PID 1) に`SIGTERM`シグナルを送信する[2]。デフォルトでは、30秒のタイムアウトの後`SIGKILL`シグナルをプロセスに送信する。各コンテナでは、最初の`SIGTERM`シグナルを適切に処理して、正常にプロセスを終了させる必要があるが、これを意識せずにタイムアウトまでに終了しなかったプロセスには、`SIGKILL`シグナルが送信され、コンテナが強制的に停止される。

[1]: https://aws.amazon.com/jp/ecs/
[2]: https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/
