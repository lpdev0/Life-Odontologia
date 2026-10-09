# Life Odontologia

Site institucional de odontologia desenvolvido para portfólio, com páginas de apresentação, tratamentos, corpo clínico e contato. O projeto é estático e pode ser publicado em hospedagem compartilhada sem etapa de build.

## Como foi construído

- **HTML semântico** dividido entre a página inicial e as pastas `sobre/`, `tratamentos/`, `corpo-clinico/` e `contato/`.
- **CSS responsivo** em `style.css`, com layouts em grid, tipografia local, imagens otimizadas, estados de foco e ajustes para celular.
- **JavaScript sem framework** em `script.js` para navegação, janelas de tratamentos, validação do formulário e efeitos de entrada.
- Imagens, ícones e fontes em `img/` e `assets/` para manter o pacote pronto para hospedagem estática.

## Interações e animações

- Menu móvel e submenu de tratamentos com estado acessível (`aria-expanded`), fechamento por Escape e retorno do foco.
- Detalhes dos tratamentos em um elemento nativo `<dialog>`, preenchido a partir de templates HTML.
- Aparição discreta das seções durante a rolagem com `IntersectionObserver` e CSS.
- Transições de botões, cartões e navegação definidas no CSS.
- Adaptação à preferência `prefers-reduced-motion`, que remove animações não essenciais.

O formulário de contato valida nome e telefone, mostra uma prévia da mensagem e prepara um link para WhatsApp. **A mensagem só é enviada se o visitante confirmar no WhatsApp**. Antes de reutilizar o projeto, confira o número de destino configurado em `script.js`.

## Estrutura

```text
index.html            Página inicial
sobre/                Página institucional
tratamentos/          Página de tratamentos
corpo-clinico/        Página da equipe
contato/              Página de contato
style.css             Layout e animações
script.js             Interações e formulário
img/ e assets/        Imagens, ícones e fontes
```

## Executar e publicar

Abra `index.html` no navegador ou use um servidor estático local. Para publicar, envie o conteúdo da pasta para `public_html` ou diretório público equivalente, mantendo as subpastas no mesmo nível de `index.html`. Os links externos de WhatsApp, Instagram e mapas dependem de conexão com a internet.

O arquivo ZIP de hospedagem foi deixado fora do repositório porque repete os arquivos que já estão organizados acima.
