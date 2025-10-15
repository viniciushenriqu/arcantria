# CHECKLIST DE CONFIGURAÇÃO DO BANCO DE DADOS - ARCANTRIA MARKET

## 1. INSTALAÇÃO DO MYSQL

### 1.1 Instalar MySQL Server
- [ ] Baixar MySQL Community Server de https://dev.mysql.com/downloads/mysql/
- [ ] Escolher versão compatível com Windows 10
- [ ] Durante instalação:
  - [ ] Selecionar "Developer Default" ou "Server only"
  - [ ] Configurar senha root (anotar senha)
  - [ ] Adicionar MySQL ao PATH do sistema
- [x] Verificar instalação: `mysql --version` (MySQL 8.0.43 encontrado)

### 1.2 Instalar MySQL Workbench (opcional, recomendado)
- [ ] Baixar MySQL Workbench de https://dev.mysql.com/downloads/workbench/
- [ ] Instalar e conectar ao servidor local

## 2. CONFIGURAÇÃO DO BANCO DE DADOS

### 2.1 Criar banco de dados
- [x] Abrir MySQL Command Line Client ou Workbench
- [x] Conectar como root
- [x] Executar comando:
  ```sql
  CREATE DATABASE arcantria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```
- [x] Verificar criação: `SHOW DATABASES;` (banco já existia)

### 2.2 Criar usuário do projeto
- [x] Ainda no MySQL Client, executar:
  ```sql
  CREATE USER 'Manthega'@'localhost' IDENTIFIED BY 'M@nthega4540';
  GRANT ALL PRIVILEGES ON arcantria_db.* TO 'Manthega'@'localhost';
  FLUSH PRIVILEGES;
  ```
- [x] Verificar usuário: `SELECT User, Host FROM mysql.user WHERE User = 'Manthega';` (usuário já existia)

### 2.3 Testar conexão
- [x] Testar conexão com credenciais do projeto:
  ```bash
  mysql -u Manthega -p -h localhost arcantria_db
  ```
  (senha: M@nthega4540) - conexão testada com sucesso

## 3. MIGRAÇÕES DJANGO

### 3.1 Executar migrações
- [x] Ativar ambiente virtual: `venv\Scripts\activate`
- [x] Navegar para `backend/arcantria_api`
- [x] Executar: `py manage.py makemigrations`
- [x] Executar: `py manage.py migrate`
- [x] Verificar se não houve erros

### 3.2 Verificar tabelas criadas
- [x] No MySQL Workbench ou client, executar:
  ```sql
  USE arcantria_db;
  SHOW TABLES;
  ```
- [x] Tabelas esperadas:
  - [x] accounts_user
  - [x] products_product
  - [x] products_inventory
  - [x] orders_order
  - [x] django_migrations
  - [x] django_content_type
  - [x] django_session
  - [x] auth_group
  - [x] auth_group_permissions
  - [x] auth_permission
  - [x] accounts_user_groups
  - [x] accounts_user_user_permissions

## 4. ESTRUTURA DAS TABELAS

### 4.1 Tabela accounts_user
```sql
DESCRIBE accounts_user;
```
Campos esperados:
- [x] id (int, PK, auto_increment)
- [x] username (varchar(30), unique)
- [x] email (varchar(254), unique)
- [x] wallet_address (varchar(42), nullable, unique)
- [x] role (varchar(10), default 'buyer')
- [x] is_active (tinyint(1), default 1)
- [x] is_staff (tinyint(1), default 0)
- [x] date_joined (datetime)
- [x] password (varchar(128))

### 4.2 Tabela products_product
```sql
DESCRIBE products_product;
```
Campos esperados:
- [x] id (int, PK, auto_increment)
- [x] name (varchar(100))
- [x] description (longtext)
- [x] price (decimal(10,2))
- [x] stock (int unsigned, default 0)
- [x] created_at (datetime)
- [x] updated_at (datetime)

### 4.3 Tabela products_inventory
```sql
DESCRIBE products_inventory;
```
Campos esperados:
- [x] id (int, PK, auto_increment)
- [x] user_id (int, FK para accounts_user)
- [x] product_id (int, FK para products_product)
- [x] quantity (int unsigned, default 1)
- [x] equipped_slot (varchar(20), nullable)
- [x] acquired_at (datetime)

### 4.4 Tabela orders_order
```sql
DESCRIBE orders_order;
```
Campos esperados:
- [x] id (int, PK, auto_increment)
- [x] user_id (int, FK para accounts_user)
- [x] product_id (int, FK para products_product)
- [x] quantity (int unsigned, default 1)
- [x] total_price (decimal(10,2))
- [x] status (varchar(10), default 'pending')
- [x] created_at (datetime)

## 5. DADOS INICIAIS

### 5.1 Criar superusuário Django
- [ ] Executar: `py manage.py createsuperuser`
- [ ] Preencher dados:
  - [ ] Username: admin
  - [ ] Email: admin@arcantria.com
  - [ ] Password: (escolher senha segura)

### 5.2 Popular produtos iniciais
- [ ] Acessar Django Admin: http://localhost:8000/admin
- [ ] Login com superusuário
- [ ] Adicionar produtos na seção "Products":
  - [ ] Espada Mágica (preço: 100.00, stock: 50)
  - [ ] Escudo Protetor (preço: 80.00, stock: 30)
  - [ ] Cajado Arcano (preço: 150.00, stock: 20)
  - [ ] Machado de Guerra (preço: 120.00, stock: 25)
  - [ ] Armadura Completa (preço: 200.00, stock: 15)

### 5.3 Verificar dados
- [ ] No admin, verificar produtos criados
- [ ] Testar endpoint: `GET http://localhost:8000/api/products/`
- [ ] Deve retornar lista com produtos

## 6. CONFIGURAÇÕES ADICIONAIS

### 6.1 Charset e Collation
- [ ] Verificar configuração do banco:
  ```sql
  SELECT @@character_set_database, @@collation_database;
  ```
- [ ] Deve retornar: utf8mb4 | utf8mb4_unicode_ci

### 6.2 Timezone
- [ ] Verificar timezone do MySQL:
  ```sql
  SELECT @@global.time_zone, @@session.time_zone;
  ```
- [ ] Recomendado: SYSTEM ou UTC

### 6.3 Backup e Restore
- [ ] Criar backup: `mysqldump -u Manthega -p arcantria_db > backup.sql`
- [ ] Restaurar backup: `mysql -u Manthega -p arcantria_db < backup.sql`

## 7. POSSÍVEIS PROBLEMAS E SOLUÇÕES

### 7.1 Erro de conexão
- [ ] MySQL Server está rodando? `net start mysql`
- [ ] Porta 3306 está livre? `netstat -ano | findstr 3306`
- [ ] Firewall bloqueando? Verificar regras do Windows Firewall

### 7.2 Erro de autenticação
- [ ] Usuário existe? `SELECT user FROM mysql.user;`
- [ ] Senha correta? Tentar login no MySQL Client
- [ ] Host correto? Usuário deve ser 'Manthega'@'localhost'

### 7.3 Erro de charset
- [ ] Banco criado com charset correto?
- [ ] Se não, recriar banco com:
  ```sql
  DROP DATABASE arcantria_db;
  CREATE DATABASE arcantria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```

### 7.4 Erro de migração
- [ ] Ambiente virtual ativado?
- [ ] Todas dependências instaladas? `pip list`
- [ ] Conexão com banco funcionando?

## 8. MONITORAMENTO

### 8.1 Status do servidor
- [ ] Verificar processos: `SHOW PROCESSLIST;`
- [ ] Verificar conexões ativas
- [ ] Monitorar uso de memória/disco

### 8.2 Logs do MySQL
- [ ] Localizar logs: Geralmente em `C:\ProgramData\MySQL\MySQL Server X.X\Data\`
- [ ] Verificar error log para problemas

---

## STATUS GERAL
- [x] MySQL instalado e configurado
- [x] Banco arcantria_db criado
- [x] Usuário Manthega criado com permissões
- [x] Migrações Django executadas
- [x] Tabelas criadas corretamente
- [ ] Dados iniciais populados
- [x] Conexão funcionando

**Última verificação:** 2024-10-05 14:30
**Status:** Funcional (core database setup completo)
