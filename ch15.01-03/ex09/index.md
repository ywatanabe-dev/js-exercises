## ReactのXSS対策について

Reactでは、JSX内に埋め込まれた文字列は自動的にサニタイズされる仕組みになっている。

```javascript
class App extends React.Component {
  render() {
    const input =
      '<iframe src="about:blank" onload={()=>{alert("XSS")}}></iframe>';
    return <div>{input}</div>;
  }
}
```

上のコードがレンダリングされると、以下のように表示される。

```
<iframe src="about:blank" onload={()=>{alert("XSS")}}></iframe>
```

このため、基本的にはXSSは起こらない仕組みになっている。しかし、アンカー要素`<a>`の`href`属性を使うと、
XSSが起きる可能性がある。

具体的には、`href`属性で指定するURLを`javascript:`で始まる文字列にすると、`:`以下の文字列がJavaScriptのコードとして実行されることを利用する。

例として以下のコードがレンダリングされると、クリックすると`alert('XSS')`が実行されるリンクが表示される。

```javascript
class App extends React.Component {
  render() {
    const input = "javascript: alert('XSS')";
    return (
      <div>
        <a href={input}>link</a>
      </div>
    );
  }
}
```

この問題は前述した仕組みでは防ぐことができない。
