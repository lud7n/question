function sendInput() {
    var name = document.getElementById('name').value.trim();
    var value = document.getElementById('value').value.trim();

    if (name === "" || value === "") {
        alert('名前とテキストの両方を入力してください。');
        return false;
    }

    // ここでフォームデータを送信する処理を追加
    alert('フォームが正常に送信されました！');
}