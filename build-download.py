from pathlib import Path
import re,zipfile
root=Path(__file__).parent
out=root/'dist'
html=(out/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(out/'style.css').read_text()+'</style>')
html=re.sub(r'<a[^>]*href="download.html"[^>]*>.*?</a>','<span>ダウンロード版</span>',html)
for name in ['verbs.js','nouns.js','app.js']:
    js=(out/name).read_text().replace('</script','<\\/script')
    html=html.replace('<script src="'+name+'"></script>','<script>'+js+'</script>')
assert not re.search(r'<script[^>]+src=|<link[^>]+stylesheet',html)
folder=out/'downloads';folder.mkdir(exist_ok=True)
(folder/'kotoba-garden.html').write_text(html)
readme='''ことばのにわ — ダウンロード版

使い方
1. ZIPファイルを展開（解凍）します。
2. kotoba-garden.html をブラウザ（Chrome / Edge / Safariなど）で開きます。
3. 「おとを ためす」を押し、日本語の音声が出るか確認します。

動詞30語・名詞250語、全80コース・800問を収録しています。
問題・イラスト・採点はHTMLファイルに含まれ、教材サーバーへの接続なしで動きます。
音声は端末・ブラウザの日本語合成音声を使います。音声の種類によっては通信が必要です。
学校の設定によりHTMLの実行や音声が制限される場合があります。
iPhone/iPadのファイルのプレビュー等では動かない場合があります。ブラウザで開いてください。
学習記録はブラウザに保存しますが、ローカルHTMLでは保存できない端末もあります。
Web版の記録はダウンロード版へ自動で引き継がれません。
児童別の管理・端末間の同期はありません。氏名は入力しません。

更新
ダウンロード版は自動更新されません。変更があればWeb版から再度ダウンロードしてください。

公開URL
https://kotoba-garden-nihongo.nuttywand13.chatgpt.site
'''
with zipfile.ZipFile(folder/'kotoba-garden.zip','w',zipfile.ZIP_DEFLATED) as z:
    z.writestr('kotoba-garden.html',html)
    z.writestr('はじめに.txt',readme)
print('Download built:',(folder/'kotoba-garden.zip').stat().st_size,'bytes')
