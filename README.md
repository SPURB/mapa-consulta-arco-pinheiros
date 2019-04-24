# PIU Arco Pinheiros
Mapa interativo da consulta pública do Projeto de Intervenção Urbana Arco Pinheiros. 

## Pré-requisitos para desenvolvimento. 
São necessárias as seguintes instalações globais para iniciar o desenvolvimento:
* [git-fls](https://git-lfs.github.com/)
* [nodejs e npm](https://nodejs.org/)
* [http-server](https://github.com/indexzero/http-server)

### Intruções de setup para desenvolvimento

1. Instale as dependências do projeto.
```bash
# clone este repositório
git clone https://github.com/SPURB/mapa-consulta-arco-pinheiros.git

cd mapa-consulta-arco-pinheiros

# instale as dependências deste projeto
npm i
```

2. Você precisará de duas janelas do terminal para desenvolver. Com o http-server instalado globalmente no seu ambiente inicie um server com cors liberado em `http://locahost:8080`. Este servirá os kmls e as legendas de `data-src/`.

```bash
# instale http-server globalmente
npm i -g http-server

# inicie http-server com CORS liberado na raiz do projeto
http-server --cors
```

3. Em uma nova janela do terminal inicie a aplicação para desenvolvimento em `http://localhost:1234`.
```
npm run start
```
Abra [localhost:1234](http://localhost:1234/) no seu browser. 


## Variáveis de ambiente

Configure as variáveis de ambiente. A partir do arquivo `.env` crie dois arquivos `.env.development.local` e `.env.production.local`. As variáveis serão trocadas de acordo com a tabela abaixo:

| Comandos             | Variáveis                   |
| -------------------- |:----------------------------|
| `npm run start`      | `.env.development.local`    |
| `npm run build`      | `.env.production.local`     |
| `npm run files`      | não utiliza variáveis `.env`|

As variáveis a serem configuraddas nos arquivo `*.env` são:

```
BING_API_KEY=chave-da-api-do-bing-mapas
APP_URL=http://seu.host.http/
API_TOKEN=token-das-consulta-publicas
```
Este projeto utiliza este [projeto como backend](https://github.com/SPURB/consultas-publicas-backend).

> Arquivos no padrão `env.*.local` são ingnorados pelo git. Cuidado para **não comitar**  estas variáveis em outros arquivos. Não comitar deleção ou alterações no arquivo `.env`.

## Compile os arquivos para publicação
Crie um arquivo `.env.production.local` com os mesmos parâmetros do arquivo `.env` e com valores do seu ambiente da publicação.

Compile os arquivos no diretório `dist/`:

```
npm run build
```

Publique os arquivos criados em `dist/` para endereço especificado em `.env.production.local`.

## Atualização de dados 
Os dados da aplicação (`data-src/json/*.json`) são arquivos compilados da [planilha do google docs](https://docs.google.com/spreadsheets/d/1n8e6H-G1UpBqU1QLXzek5uPW0LItsvYoZ_hsUHM_3SI/). Havendo atualizações será necessário compilar novamte. Para fazer isso rodar o comando antes do `start` ou `build`:

```
npm run files
```

## Documentação de bugs
Toda contribuição é bem vinda. Crie uma [issue](https://github.com/SPURB/levantamento-operacao-urbana-centro/issues).

## Licença
[GNU General Public License v3.0](https://github.com/SPURB/levantamento-operacao-urbana-centro/blob/master/LICENSE).

## 
> ### Nota
Arquivos kmls na rede interna da São Paulo Urbanismo estão disponíveis em:
`\\spurbsp01\Gestao_Projetos\Projetos\Arco Pinheiros\01_PIU_ACP\05_Processo_Participativo\ConsultaPublica_2`

