<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<title>悪いインターネット | フォームで地図から住所入力</title>
</head>
<body>

<?php
$pcode = htmlspecialchars($_POST['postal-code']);
$addrlev1 = htmlspecialchars($_POST['address-level1']);
$addrlev2 = htmlspecialchars($_POST['address-level2']);
$addrlin1 = htmlspecialchars($_POST['address-line1']);
$addrlin2 = htmlspecialchars($_POST['address-line2']);

$hoge = <<< EOM
<h1>ダミーだってばよ</h1>
<dl>
	<dt>フォームから渡された入力値:</dt>
	<dd>郵便番号:&emsp;{$pcode}</dd>
	<dd>都道府県:&emsp;{$addrlev1}</dd>
	<dd>市町村名:&emsp;{$addrlev2}</dd>
	<dd>番地建物名1:&emsp;{$addrlin1}</dd>
	<dd>番地建物名2:&emsp;{$addrlin2}</dd>
</dl>
EOM;

echo $hoge;
?>

<br />
<p>このページ(フォームからのデータ受取側)のソースは<a href="https://warui.intaa.net/contents/address/hoge.php.txt">https://warui.intaa.net/contents/address/hoge.php.txt</a>にあります。(普通にフォームから受け取って表示するだけのもの)</p>
</body>
</html>
