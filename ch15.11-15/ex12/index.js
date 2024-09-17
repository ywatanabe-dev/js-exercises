const input = document.getElementById("inputToken");

document.getElementById("upload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const accessToken = input?.value.trim() ?? "";
  if (!file) {
    alert("file not input.");
    return;
  }
  const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`;
  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
      body: file,
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("upload failed.");
    } else {
      alert("upload completed.");
    }
  } catch (error) {
    alert("upload failed.");
  }
});
