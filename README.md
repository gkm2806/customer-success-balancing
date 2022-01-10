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
# RD Challenge
## Nossas expectativas
A equipe de engenharia da RDStation tem alguns princípios onde baseamos nosso trabalho diário. Um deles é: Projete seu código para ser mais fácil de entender, não mais fácil de escrever. 

Portanto, para nós é mais importante um código de fácil leitura do que um que utilize recursos arquitetados complexos e desnecessários.
O que gostariamos de ver:

- O código deve ser fácil de ler. [Clean Code](https://medium.com/rd-shipit/clean-code-23580b4e556c) pode te ajudar
- Notas gerais e informações sobre a versão da linguagem e outras informações importantes para executar seu código.
- Código que se preocupa com a performance (Complexidade de Algoritmo)
- O seu código deve cobrir todo os casos de usos presentes no README, mesmo que não haja um teste implementado para tal.
- Você deve enviar o código-fonte da solução para nós como um arquivo contendo apenas a solução de código ou
 pode fazer o upload da solução para repositórios públicos (GitHub, BitBucket, etc) desde que nos envie o último commit
- Testes. Você pode adicionar novos testes, mas sem alterar o pacote original


## Choose your weapon:

- [Ruby](ruby/README.md) ✅
- [JavaScript](javascript/README.md) ✅

