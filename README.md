# Painel Check-in — Supabase + GitHub/Cloudflare Pages

Este repositório contém um painel **estático** (HTML/JS) que lê diretamente a view `v_painel_drivers` do **Supabase** usando a **anon key**.

## Como publicar

### Opção 1 — Cloudflare Pages (recomendado)
1. Crie um projeto no Cloudflare Pages e conecte este repositório.
2. Build command: *(vazio)*
3. Output directory: `/` (raiz)
4. Faça o deploy. O site ficará disponível em `https://<seu-projeto>.pages.dev`.

### Opção 2 — GitHub Pages
1. Settings → Pages → Deploy from a branch → `main` → `/ (root)`

## Ajustes
Se quiser trocar as credenciais do Supabase, edite no `index.html` os valores:
```js
const SUPABASE_URL  = "...";
const SUPABASE_ANON = "...";
```

## Segurança
A `anon key` é pública por design e deve ter **apenas permissão de leitura**. Toda escrita/privado deve ser feita por backend ou function com `service_role`.
