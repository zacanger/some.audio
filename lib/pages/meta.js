const keywords = [
  'audio',
  'email',
  'filehost',
  'host',
  'mp3',
  'music',
  'online',
  'record',
  'share',
  'sound',
  'sounds',
  'track',
  'tracks',
  'upload'
]

module.exports = `
<title>some.audio</title>

<meta charset="utf-8">
<meta name="description" content="Simple, anonymous audio file host.">
<meta name="author" content="Zac Anger">
<meta name="keywords" content="${keywords.join(', ')}">
<meta name="google-site-verification" content="PWKgNautNUTPGA4y9DLBtK8h-BOOoR6B48VohQ2_95U">
<meta name="theme-color" content="#ffffff">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="HandheldFriendly" content="true">

<link rel="stylesheet" type="text/css" href="/styles.min.css">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" size="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" size="32x32" href="/favicon-32x32.png">

<meta property="og:type" content="website">
<meta property="og:url" content="https://some.audio">
<meta property="og:title" content="some.audio">
<meta property="og:description" content="Simple, anonymous audio file host.">
<meta property="og:image" content="https://some.audio/logo.png">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://some.audio">
<meta name="twitter:title" content="some.audio">
<meta name="twitter:description" content="Simple, anonymous audio file host.">
<meta name="twitter:image" content="https://some.audio/logo.png">
`
