(() => {
  /*
  THETAのcommand/execute WebAPIの仕様からcurlスクリプトを生成するブックマークレット。
  GitHub上の以下のような仕様書のページで使う。
  https://github.com/ricohapi/theta-api-specs/blob/main/theta-web-api-v2.1/commands/camera.list_files.md
  */
  const command = document.querySelector(".markdown-body.entry-content.container-lg h1").innerText;
  const parameters = document.getElementById("user-content-parameters")
    .parentElement.nextElementSibling;
  const body = parameters.querySelector("tbody");
  const param_list = [];
  if (body !== null) {
    const params = body.querySelectorAll("tr");
    for (const param of params) {
      param_list.push(param.querySelector("td").innerText);
    }
  }
  let result = `curl -X POST -H "Content-Type: application/json" -d "{\\"name\\": \\"${command}\\"`;
  if (param_list.length !== 0) {
    result += ', \\"parameters\\": {';
    for (let i = 0; i < param_list.length; i++) {
      if(i !== 0) {
        result += ", "
      }
      result += `\\"${param_list[i]}\\": (input param)`;
    }
    result += "}";
  }
  result += '}" http://192.168.1.1/osc/commands/execute';
  alert(result);
})();
