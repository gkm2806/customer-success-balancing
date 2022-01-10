# My readme

Apesar da parte ruby estar no padrão que vocês pediram, a pasta javascript esta *um pouquinho* diferente hehe. 
## The cake is a lie
Se vocês só se importarem com o que foi pedido, existe a `/javascript/original` que é basicamente o arquivo original, só que `.spec.js` em vez de `.js`. 
O comando `"original"` no `package.json` roda justamente essa folder

e.g.: `npm run original` or `yarn original`

## Types, tipos todo-onde
Agora pra parte divertida :)

O resto da pasta foi escrita em typescript, com eslint, e foi onde eu realmente fiz a lógica toda antes de passar pra rb e js.
O comando de `test` padrão builda o typescript e roda jest na dist igual a CI (spoiler)

## Criminal Intent (CI)
É estranho fazer só CI sem a outra metade.
Tem [um PR](https://github.com/gkm2806/customer-success-balancing/tree/feature/ci) setando a ci, uma action incrível me salvou de configurar o ruby do zero e acho que o resultado ficou bem legal. O primeiro commit em um pr que rodou com sucesso as duas pipelines foi [esse](https://github.com/gkm2806/customer-success-balancing/pull/2/checks).

## Alguns bugs
- 1 Eu quebrei uma das regras e modifiquei os casos de testes originais. [O 3° cenário do javascript estava diferente da do ruby e não fazia muito sentido](https://imgur.com/a/6mSDCyM)... numa linha ele define o id 999 como away e na de baixo espera que a resposta seja 999;
- 2 Por mais que todos os testes estejam rodando, acredito que o 2° esteja errado e acabe causando um comportamento que vai contra uma das premissas (mas depois a gente conversa mais sobre isso).


## That's all, folks!
***

