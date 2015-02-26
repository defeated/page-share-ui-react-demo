# (Demo) React-based UI

This is more or less the tutorial from react docs, but using my own
breakable toy api on the backend: https://github.com/defeated/page-share

## setup

  1. `npm install`
  2. `npm run build`
  3. `open dist/index.html`

## components

```html
<ShareBox>
  <ShareBox.Form />
  <ShareBox.List>
    <ShareBox.Result />
    <ShareBox.Result />
    ...
  </ShareBox.List>
</ShareBox>
```

## flow

  1. url field is base64-tokenized
  2. fetch jsonp from https://page-share.herokuapp.com/ _token_
  3. append scraped details to list (LIFO)
