# (Demo) React-based UI

This is more or less the tutorial from react docs, but using my own
breakable toy api on the backend: https://github.com/defeated/page-share

## components

```html
<ShareBox>
  <ShareForm />
  <ShareList>
    <ShareResult />
    <ShareResult />
    ...
  </ShareList>
</ShareBox>
```

## flow

  1. url field is base64-tokenized
  2. fetch jsonp from https://page-share.herokuapp.com/ _token_
  3. append scraped details to list (LIFO)
