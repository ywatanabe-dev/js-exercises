### localStorage と sessionStorage それぞれに保存されたデータの有効期限がどのように異なるか

#### タスク入力→タブをリロード

- localStorage : そのままの状態が復元される(データが保持される)
- sessionStorage : そのままの状態が復元される(データが保持される)

#### タスク入力→タブを閉じて再度開く

- localStorage : そのままの状態が復元される(データが保持される)
- sessionStorage : 初期状態に戻る(データは削除される)

#### タスク入力→別タブで同時に開く

- localStorage : そのままの状態が復元される(データが保持される)。元のタブでlocalStorageを変更するとstorageイベントが実行される。
- sessionStorage : 別タブは初期状態に戻る(データは削除される)。storageイベントも実行されない。
