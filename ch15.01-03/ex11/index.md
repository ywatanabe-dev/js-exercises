### ボタン押下時のコンソール出力結果

```
div
button
```

### div.addEventListener()のcaptureをfalseにした場合

```
button
div
```

### divに登録済みのイベント

```javascript
() => {
  console.log("div");
};
```

### btnに登録済みのイベント

```javascript
() => {
  console.log("button");
};
```

```javascript
() => {
  randomEventTarget.trigger();
};
```
