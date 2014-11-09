# Build Design

- npm
- Flux
    - Use [Mcfly](http://kenwheeler.github.io/mcfly/ "Mcfly - Flux Architecture Made Easy")

# Layout

- Layout
- Home
    - HTML
- Timeline
    - JSON
- Products
    - Markdown
- Sites
    - Markdown

# Step

1. Setup Build
2. Create Dispatchers
3. Create Actions
4. Create Stores
5. Create Components
    - JSON
    - Markdown


# 構成

### Router

- library : [routr](https://github.com/yahoo/routr "routr")
- メニューからのリンクをクリック -> Router-Action -> StoreでURLを変更
- ロードした時-> [routr](https://github.com/yahoo/routr "routr") でマッチ判定 -> Router-Action -> Store
    
### Page

- home
- sites
- timeline