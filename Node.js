const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDBとの接続
mongoose.connect('mongodb://localhost:27017/userInputDB')
    .then(() => {
        console.log('MongoDBに接続しました。');
    })
    .catch(err => {
        console.error('MongoDB接続エラー:', err);
    });

// モデルの定義
const userInputSchema = new mongoose.Schema({
    name: String,
    value: String
});
const UserInput = mongoose.model('UserInput', userInputSchema);

// ミドルウェア
app.use(bodyParser.json());

// 静的ファイルのディレクトリを設定
app.use(express.static('public'));

// ルートパスへのGETリクエストに対する応答
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/save', (req, res) => {
    console.log(req.body);  // リクエストボディの内容をログに出力
    const newUserInput = new UserInput({
        name: req.body.name,
        value: req.body.value
    });
    newUserInput.save()
        .then(() => res.send('データが正常に保存されました'))
        .catch(err => {
            console.error('データの保存に失敗しました:', err);
            res.status(500).send('データの保存に失敗しました');
        });
});

// サーバーの起動
app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました。`);
});