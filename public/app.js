function sendInput() {
    const name = document.getElementById('name').value.trim();
    const value = document.getElementById('value').value.trim();

    if (name === "" || value === "") {
        alert('名前とテキストの両方を入力してください。');
        return;
    }

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, value: value })
    })
        .then(response => response.json())
        .then(data => {
            alert('データが正常に保存されました');
        })
        .catch(error => {
            console.error('データの保存に失敗しました:', error);
            alert('データの保存に失敗しました');
        });
}