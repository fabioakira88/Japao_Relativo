# JR Consultoria: Google Apps Script Intake

Este diretório prepara a integração do formulário de Consultoria do Japão Relativo com Google Apps Script, Google Sheets e notificação por e-mail.

O site estático não consegue gravar dados diretamente no Google Sheets sozinho. A gravação real só acontece depois que o proprietário cria a planilha, publica o Web App do Apps Script e configura a URL `/exec` no site.

## Dados Gravados

A planilha usa a aba `Solicitacoes` com as colunas:

`protocolo`, `submission_id`, `data_hora_jst`, `status_atendimento`, `status_notificacao`, `data_contato`, `data_agendamento_jr`, `data_agendamento_oficial`, `observacoes_internas`, `nome`, `servico`, `provincia`, `cidade`, `prazo`, `tipo_ajuda`, `situacao`, `canal`, `contato`, `consentimento`, `origem`, `user_agent`.

O `status_atendimento` inicial é `Novo`. Use a planilha para controlar etapas como `Novo`, `Contato realizado`, `Aguardando cliente`, `Agendado` e `Concluido`.

O `status_notificacao` registra `enviado`, `falhou` ou `pendente`. A planilha é a fonte da verdade: se a linha foi gravada, o site pode retornar o protocolo mesmo quando o e-mail administrativo falhar.

## Passo A Passo

1. Crie uma planilha privada no Google Sheets.
2. Copie o ID da planilha. Ele fica na URL, entre `/d/` e `/edit`.
3. Abra `Extensoes > Apps Script` a partir da planilha.
4. Substitua o conteúdo do arquivo `Code.gs` pelo conteúdo deste repositório em `integrations/google-apps-script/Code.gs`.
5. No Apps Script, abra `Project Settings > Script Properties`.
6. Adicione as propriedades:
   - `SHEET_ID`: ID da planilha privada.
   - `NOTIFICATION_EMAIL`: e-mail que receberá avisos de novas solicitações.
7. Clique em `Deploy > New deployment`.
8. Selecione `Web app`.
9. Configure:
   - Execute as: `Me`.
   - Who has access: `Anyone`.
10. Autorize o script na sua conta Google.
11. Copie a URL terminada em `/exec`.
12. Configure essa URL no site em `SITE/consultoria/index.html`, no meta:

```html
<meta name="jr-consultoria-endpoint" content="https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/exec">
```

Não coloque `SHEET_ID`, e-mail administrativo ou qualquer segredo no JavaScript público.

## Renovar Uma Implantacao

Quando alterar `Code.gs`:

1. Abra o Apps Script.
2. Clique em `Deploy > Manage deployments`.
3. Edite a implantação ativa.
4. Selecione uma nova versão.
5. Salve.
6. Teste novamente a URL `/exec`.

## Teste Sem Dados Reais

Use dados fictícios:

- Nome: `Teste JR`
- Contato: `teste@example.com`
- Situação: `Teste técnico de integração, sem dados reais.`

Depois confirme:

- a linha apareceu na aba `Solicitacoes`;
- o protocolo foi gerado;
- o e-mail de notificação chegou;
- o site mostrou a mensagem de sucesso com protocolo.

## Operacao Do Atendimento

- `NOTIFICATION_EMAIL` é o canal administrativo principal. O Apps Script envia notificação apenas para esse e-mail.
- O formulário pergunta o canal preferido do cliente: WhatsApp, e-mail, Instagram ou Facebook.
- Não há envio automático por WhatsApp neste MVP.
- Se o cliente escolher WhatsApp, responda manualmente pelo número informado, com código internacional.
- Para passaporte e serviços consulares, o JR pode orientar a navegação e organização, mas o agendamento oficial acontece no sistema oficial, depois da validação consular, pelo próprio interessado.
- Não solicite senha, PIN, My Number, dados bancários, fotografias de documentos, zairyu card, passaporte ou documentos fiscais.

## Segurança E Privacidade

- Não solicite My Number, senha, PIN, dados bancários, fotografias de documentos, zairyu card, passaporte ou documentos fiscais.
- O servidor limita e sanitiza campos.
- Valores gravados na planilha que comecem com `=`, `+`, `-` ou `@` são prefixados com apóstrofo para evitar interpretação como fórmula.
- `situacao` é limitada a 600 caracteres.
- Submissões sem consentimento são rejeitadas.
- O formulário possui honeypot contra robôs.
- O servidor usa `LockService` durante gravações e reutiliza `submission_id` para evitar duplicidade em tentativas repetidas.
- O servidor aplica limitação global conservadora com `CacheService` para proteger cotas do Apps Script.
- `Origin` e `Referer` podem ser observados apenas como sinal auxiliar. Eles não são autenticação.
- Se houver abuso real, a próxima evolução recomendada é CAPTCHA/Turnstile validado no servidor.
- O GA4 do site deve registrar apenas sucesso/erro, serviço e protocolo. Não envie nome, contato nem situação ao GA4.

## Politica De Privacidade

Este repositório ainda não possui uma página dedicada de política de privacidade. O formulário informa finalidade, acesso restrito, retenção sugerida de 12 meses após encerramento, possibilidade de exclusão antecipada e não uso para publicidade sem novo consentimento. Antes de escalar o fluxo, crie uma política pública dedicada e vincule-a ao formulário.

## Estado Antes Da URL Real

Enquanto `jr-consultoria-endpoint` estiver vazio, o site não finge envio. Ele valida o formulário, preserva os dados preenchidos e oferece `Copiar resumo` como contingência.
