# back-end-tf-web
Back-End do trabalho final da disciplina de WEB

# Backend da Conexão Carreira

A aplicação `Conexão Carreira` foi desenvolvida para promover a conexão entre alunos do IFNMG Campus Salinas e empresas em busca de talentos. Nossa plataforma permite que alunos criem perfis detalhados, destacando experiências acadêmicas, habilidades e informações de contato. Empresas podem explorar perfis e encontrar candidatos qualificados. Facilitamos a integração entre a comunidade acadêmica e o setor empresarial, proporcionando oportunidades valiosas para ambas as partes. Conecte-se, descubra talentos e impulsione o futuro profissional com a `Conexão Carreira`.

## Membros da equipe

- Geovanna Mendes Dutra
- John Lucas Ferreira Rodrigues
- Nicoly Thifanny Santos Neres
- Pedro Henrique Santos e Ferreira
- Robert Hucy Nunes Alves

## Modelo conceitual do banco de dados

![modelo conceitual do banco de dados](db/conceitual.png)

## Modelo lógico do banco de dados

![modelo lógico do banco de dados](db/logico.png)

## Modelo físico do banco de dados

[Modelo físico do banco de dados](db/DDL.sql)

## Ferramentas Utilizadas
- **brModelo** (Para cração dos modelos conceitual e lógico)
- **Visual Studio Code** (Para criação do modelo físico)
- **Neon Tech** (Para hospedar o banco de dados)
- **Vercel** (Para hospedagem da API)

## Endpoints da API

**URL da API: https://api-conexao-carreira.vercel.app**

---
#### [POST] /login

**Descrição:** Retorna o token de acesso para a API.

**Body:**
```json
{
    "email": "email",
    "senha": "senha"
}
```

---
#### [GET] /user

**Descrição:** Retorna os dados de todos os usuários cadastrados.

**Header:**
```js
token: your_login_token
```

---
#### [GET] /user/{id}

**Descrição:** Retorna os dados de um usuário em específico.

**Header:**
```js
token: your_login_token
```

---
#### [GET] /user/{id}/hability

**Descrição:** Retorna as habilidades de um usuário.

**Header:**
```js
token: your_login_token
```

---
#### [POST] /user

**Descrição:** Insere um novo usuário no sistema.

**Header:**
```js
token: your_login_token
```

**Body:**
```json
{
    "nome": (String) "nome",
    "nome_completo": (String) "nome_completo",
    "email": (String) "email",
    "senha": (String) "senha",
    "telefone": (String) "telefone",
    "curso": (Int) "curso",
    "estado": (Int) "estado",
    "ativo": (Bool) "ativo"
}
```

**Observações**

Possíveis valores para o campo curso:

```php
[1] => "Agroindústria"
[2] => "Agropecuária"
[3] => "Informática"
```

Possíveis valores para o campo estado:

```php
[1] => "Matriculado"
[2] => "Cursando"
[3] => "Trancado"
[4] => "Concluído"
[5] => "Desistente"
```

---
#### [PUT] /user/{id}

**Descrição:** Atualiza os dados de um usuário.

**Header:**
```js
token: your_login_token
```

**Body:**
```json
{
    "nome": (String) "nome",
    "nome_completo": (String) "nome_completo",
    "email": (String) "email",
    "senha": (String) "senha",
    "telefone": (String) "telefone",
    "curso": (Int) "curso",
    "estado": (Int) "estado",
    "ativo": (Bool) "ativo"
}
```

**Observações**

Possíveis valores para o campo curso:

```php
[1] => "Agroindústria"
[2] => "Agropecuária"
[3] => "Informática"
```

Possíveis valores para o campo estado:

```php
[1] => "Matriculado"
[2] => "Cursando"
[3] => "Trancado"
[4] => "Concluído"
[5] => "Desistente"
```

---
#### [DELETE] /user/{id}

**Descrição:** Exclui um usuário do sistema.

**Header:**
```js
token: your_login_token
```

---
#### [POST] /hability

**Descrição:** Cadastra uma nova habilidade.

**Header:**
```js
token: your_login_token
```

**Body:**
```json
{
    "usuario": (Int) "usuario",
    "titulo": (String) "titulo",
    "descricao": (String) "descricao"
}
```

---
#### [PUT] /hability/{id}

**Descrição:** Atualiza os dados de uma habilidade.

**Header:**
```js
token: your_login_token
```

**Body:**
```json
{
    "usuario": (Int) "usuario",
    "titulo": (String) "titulo",
    "descricao": (String) "descricao"
}
```

---
#### [DELETE] /hability/{id}

**Descrição:** Exclui uma habilidade.

**Header:**
```js
token: your_login_token
```
