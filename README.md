# Portfolio-2026

Questo repository contiene il sito web personale generato da `portfolio.html`.

Istruzioni rapide per pubblicare su GitHub Pages (root of `main` branch):

1. Inizializza il repository locale e fai il primo commit:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
```

2. Crea un repository su GitHub (via interfaccia web o con `gh`):

```bash
# con GitHub CLI
gh repo create <USERNAME>.github.io --public --source=. --remote=origin --push
```

3. Se non usi `gh`, aggiungi il remote e push manualmente:

```bash
git remote add origin https://github.com/<USERNAME>/<repo>.git
git push -u origin main
```

4. Abilita GitHub Pages: nelle impostazioni del repository vai su "Pages" → source: `main` branch → root (/) → Save.

5. Il sito sarà disponibile su `https://<USERNAME>.github.io/<repo>/` o `https://<USERNAME>.github.io/` se il repo è named `<USERNAME>.github.io`.

Se vuoi, posso inizializzare git e fare il commit locale per te, e poi guidarti nel creare il repository remoto.