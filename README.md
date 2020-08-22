# Milk-Point Mobile
PROTÓTIPO DE UM APLICATIVO MÓVEL PARA O PROGRAMA DE AQUISIÇÃO DE ALIMENTO DO ESTADO DO CEARÁ (PAA - LEITE)

## Releases:
### Versão 1.0:
- Versão inicial do projeto, já com a possibilidade de realizar o login entre diferentes perfis, realizar depositos e retiradas, além do responsável poder confirmar ou não ambas as ações dos produtores e laticinios.

### Versão 1.1:
- Ajustes do layout para resoluções inferiores
- Melhorias no calendário e na exibição da lista de histórico
- Componentização de alguns módulos
- Ajustes na lista do histórico, na seleção por data e valor para os perfis produtor e laticínio
- O mapa agora mostra a rota e a distancia entre o usuário e o tanque selecionado
- Ao clicar no pin que marca o local do tanque é mostrado detalhes do mesmo
- Mudanças nos ícones de ovelha para cabra e outra figura para a vaca
- Correções nos bugs de atualizações dos tanques na home e correção para iniciar sempre na home de cada perfil
- Implementação do sistema de retirada total para o laticínio
- Ajustes nos botões de retirada e deposito para os perfis produtor e laticínio
- Criação de buscas quinzenais no histórico de cada perfil
- Criação de buscas mensais no histórico de cada perfil
- Criação de buscas por data personalizada no histórico de cada perfil
- Correção na listagem do histórico, agora o nome do solicitante aparece para o responsável
- Ao clicar e segurar em um tanque, será direcionado para uma página de detalhes do mesmo
- Contabilização dos litros depositados por quinzena, mensal e desde a criação de forma individual por cada perfil mostrado na telha de detalhes do tanque
- Ajustes no tratamento de erros do login como e-mail e senhas vazios ou incorretos
- Criação da pagina de recuperação de senha (ainda sem funcionalidade)
- Ajustes nas exibições dos depósitos e retiradas pendentes, agora a lista é ordenada por data e hora (ascendente)
- Ajustes nas exibições dos históricos de todos os perfis, agora a lista é ordenada por data e hora (descendente)
- Agora quando o responsável realizar um cancelamento, ele pode deixar um comentário dizendo o motivo da ação
- Os calendários agora só permitem selecionar datas até o presente dia, não mais datas futuras
- Criação da tela de carregamento (splash screen)
- A cor do ícone do calendário agora muda conforme o filtro selecionado
- Tela de saída do app para melhor percepção do usuário quando realizar a ação de sair

## Bibliotecas utilizadas no projeto:
- React Navigation: https://reactnavigation.org/docs/getting-started
- React Vector Icons: https://github.com/oblador/react-native-vector-icons
- Speedometer Chart: https://www.npmjs.com/package/react-native-speedometer-chart
- Maps: https://github.com/react-native-community/react-native-maps
- Lottie: https://airbnb.io/lottie/#/
- Moment: https://momentjs.com/docs/
- NativeBase: https://docs.nativebase.io/
- NativePaper: https://callstack.github.io/react-native-paper/
- DateTimePicker: https://github.com/react-native-community/datetimepicker
  



