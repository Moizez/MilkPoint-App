<h1 align="center">
 
![mk-banner-git](https://user-images.githubusercontent.com/29413231/98022735-bd438580-1de4-11eb-84f4-c8d319da76bc.png)

</h1>

 # MilkPoint | Mobile
> Protótipo de um aplicativo móvel para o Programa de Aquisição de Alimento do Estado do Ceará – **PAA - Leite**.

<p align="center">
<img alt="React native" src="https://img.shields.io/static/v1?label=react-native&message=framework&color=blue&style=for-the-badge&logo=REACT"/>
 
<a href="https://github.com/Moizez/Milk-Point" alt="Activity">
 <img src="http://img.shields.io/static/v1?label=COMMIT%20ACTIVITY&message=95/month&color=9cf&style=for-the-badge"/></a>
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=yellow&style=for-the-badge"/>
</p>

## Índice
- [Demonstração](#Demonstração)
- [Apresentação](#Apresentação)
- [Instalação](#Instalação)
- [Etapas](#Etapas)
- [Tecnologias](#Tecnologias)
- [Contato](#Contato)

## Demonstração

#### Tela de Login e Logout
<p>
 <img src="https://i.ibb.co/znmYVJr/1-Tela-de-login.jpg" width="250" height="445" alt="1 - Tela de login" border="0">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://i.ibb.co/YNHD291/photo-2020-11-03-16-57-48.jpg" />
</p>

#### Tela de Inicial do Produtor e Laticínio
<p>
 <img src="https://i.ibb.co/3TbpjnR/3-Tela-inicial-produtor.jpg" width="250" height="445" alt="3 - Tela inicial produtor" border="0">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <img src="https://i.ibb.co/vdqw7m6/4-Tela-inicial-do-latic-nio.jpg" width="250" height="445" alt="4 - Tela inicial do laticínio" border="0">
</p>

#### Tela de Inicial do Responsável e Técnico
<p>
 <img src="https://i.ibb.co/F3L4Nwt/5-Tela-inicial-do-respons-vel.jpg" width="250" height="445" alt="5 - Tela inicial do responsável" border="0">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <img src="https://i.ibb.co/y8wQhnK/6-Tela-inicial-do-t-cnico.jpg" width="250" height="445" alt="6 - Tela inicial do técnico" border="0">
</p>

## Apresentação
Este projeto foi realizado para minha prática pessoal e como forma de contribuição para a comunidade de desenvolvedores, não visando nenhum lucro,
apenas focado em compartilhar conhecimento e crescimento profissional. Para a criação deste clone do **Nubank** utilizei como base o [vídeo](https://youtu.be/DDm0M_rZLJo) da Rocketseat do Diego Fernandes.

## Instalação
```bash
  # Tendo em mente que você já tem instalado o NPM e o Yarn, primeiro faça o clone ou faça o download deste repositório:
  $ git clone https://github.com/Moizez/PicPay-Clone.git

  # Em seguida abra o terminal na pasta do projeto e execute o comando abaixo para instalar as dependências.
  $ npm install ou yarn

   # Dê um link completo pra que os icons fiquem visíveis no projeto.
   $ react-native link

  # Execute no dispositivo movel
  $ npx react-native run-android

```
Obs: Em caso de dúvidas consulte a documentação oficial do [react native](https://reactnative.dev/docs/0.60/getting-started).

#### Passo Adicional no Android

Para que os gestos sejam habilitados no Android é necessário um passo a mais, que é bem simples, abra o arquivo `android/app/src/main/java/<pacote_do_projeto>/MainActivity.java`, e começe importando os pacotes como abaixo:

```java
// ...
import com.facebook.react.ReactActivity;
// Importações adicionadas
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
```

Feito a importação vamos criar um método novo, logo abaixo do `getMainComponentName()`, ficando:

```java
public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() { ... }
  // Método adicionado
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
  
```

## Etapas
- [x] Criação das pages e dos arquivos de estilos
- [x] Criação do componente header
- [x] Criação do componente tab
- [x] Criação do card na home
- [x] Criação do componente menu
- [x] Implementação das animações

## Tecnologias
|Tecnologias | Versão |
|------------|--------|
|react        |**16.13.1** |
|react-native |**0.63.2** |
|react-native-gesture-handler |**^1.8.0** |
|react-native-qrcode-svg     |**^6.0.6** |
|react-native-svg     |**^12.1.0** |
|reactotron-react-native     |**^5.0.0** |
|styled-components     |**^5.1.1** |

## Contato
Moisés Henrique | Analista de Sistemas
- E-mail: moizezhenrique@gmail.com
- Twitter: [@moizezhenrique](https://twitter.com/moizezhenrique)
- Instagram: [@moizezhenrique](https://www.instagram.com/moizezhenrique)
