# CHECKLIST DE CONFIGURAÇÃO - ARCANTRIA MARKET

## 1. INSTALAÇÃO DO BACKEND (Django)

### 1.1 Instalar Python
- [x] Baixar Python 3.8+ de https://www.python.org/downloads/
- [x] Durante instalação, marcar "Add Python to PATH"
- [x] Verificar instalação: `python --version`

### 1.2 Criar ambiente virtual
- [x] Navegar para `backend/arcantria_api`
- [x] Executar `python -m venv venv`
- [x] Ativar ambiente: `venv\Scripts\activate`
- [x] Verificar ativação (prompt deve mostrar (venv))

### 1.3 Instalar dependências
- [x] Verificar se existe `requirements.txt`
- [x] Se existir: `pip install -r requirements.txt`
- [x] Se não existir, instalar manualmente:
  - [x] `pip install django`
  - [x] `pip install djangorestframework`
  - [x] `pip install djangorestframework-simplejwt`
  - [x] `pip install mysqlclient`
  - [x] `pip install corsheaders`
  - [x] `pip install django-filter`

### 1.4 Configurar banco de dados MySQL
- [ ] Certificar que MySQL está instalado e rodando
- [ ] Criar banco: `CREATE DATABASE arcantria_db;`
- [ ] Verificar credenciais em `backend/arcantria_api/arcantria_api/settings.py`
- [ ] Confirmar DATABASES config:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME': 'arcantria_db',
          'USER': 'Manthega',
          'PASSWORD': 'M@nthega4540',
          'HOST': 'localhost',
          'PORT': '3306',
      }
  }
  ```

### 1.5 Executar migrações
- [x] `python manage.py makemigrations`
- [x] `python manage.py migrate`
- [x] Verificar se não houve erros

### 1.6 Criar superusuário (opcional)
- [ ] `python manage.py createsuperuser`
- [ ] Preencher dados solicitados

### 1.7 Rodar servidor backend
- [x] `python manage.py runserver`
- [x] Verificar se roda em http://localhost:8000
- [x] Testar endpoint: http://localhost:8000/api/
- [x] Instalar dependência web3 (resolvido erro ModuleNotFoundError)

## 2. INSTALAÇÃO DO FRONTEND (React)

### 2.1 Instalar Node.js
- [x] Baixar Node.js de https://nodejs.org/
- [x] Verificar instalação: `node --version` e `npm --version`

### 2.2 Instalar dependências
- [x] Navegar para `arcantria-market`
- [x] Executar `npm install`
- [x] Aguardar conclusão da instalação

### 2.3 Configurar variáveis de ambiente (opcional)
- [ ] Criar arquivo `.env` na pasta `arcantria-market`
- [ ] Adicionar: `REACT_APP_API_URL=http://localhost:8000/api`

### 2.4 Rodar servidor frontend
- [x] `npm start`
- [x] Verificar se roda em http://localhost:3000

## 3. CONFIGURAÇÕES ADICIONAIS

### 3.1 Instalar MetaMask
- [ ] Baixar extensão para Chrome/Firefox: https://metamask.io/
- [ ] Criar/importar carteira
- [ ] Configurar rede (mainnet/testnet)

### 3.2 Verificar configurações
- [x] CORS configurado: `CORS_ALLOW_ALL_ORIGINS = True`
- [x] JWT configurado em `REST_FRAMEWORK`

### 3.3 Verificar portas
- [x] Backend: http://localhost:8000 ✅
- [x] Frontend: http://localhost:3000 ✅

## 4. TESTANDO A APLICAÇÃO

### 4.1 Teste básico
- [x] Abrir navegador em http://localhost:3000
- [x] Página de login deve carregar
- [x] Botão "Conectar com MetaMask" visível

### 4.2 Teste de login
- [ ] Clicar em "Conectar com MetaMask"
- [ ] Aprovar conexão na MetaMask
- [ ] Deve redirecionar para marketplace

### 4.3 Teste de funcionalidades
- [ ] Produtos devem aparecer no marketplace
- [ ] Saldo deve ser exibido
- [ ] Botões de compra funcionais

### 4.4 Teste de API
- [x] Endpoint /api/products/ responde corretamente
- [ ] Endpoint /api/auth/login-wallet/ funciona
- [ ] Endpoint /api/balance/ retorna saldo
- [ ] Endpoint /api/orders/ cria pedidos

## 5. POSSÍVEIS PROBLEMAS E SOLUÇÕES

### 5.1 Erro de conexão MySQL
- [ ] MySQL está rodando?
- [ ] Credenciais corretas em settings.py?
- [ ] mysqlclient instalado? `pip install mysqlclient`

### 5.2 Erro de CORS
- [ ] `CORS_ALLOW_ALL_ORIGINS = True` em settings.py?
- [ ] `corsheaders` em INSTALLED_APPS?

### 5.3 Erro de JWT
- [ ] `djangorestframework-simplejwt` instalado?
- [ ] JWT em INSTALLED_APPS e AUTHENTICATION_CLASSES?

### 5.4 MetaMask não conecta
- [ ] Extensão instalada?
- [ ] Carteira criada?
- [ ] Rede correta selecionada?

## 6. ESTRUTURA DO PROJETO ✅
- [ ] `arcantria-market/` - Frontend React
- [ ] `backend/arcantria_api/` - Backend Django
- [ ] Apps: accounts, products, orders
- [ ] Configurações principais ok

## 7. ENDPOINTS DA API ✅
- [ ] POST /api/auth/login-wallet/
- [ ] GET /api/users/me/
- [ ] GET /api/products/
- [ ] GET /api/balance/
- [ ] POST /api/orders/
- [ ] POST /api/orders/{id}/pay/

## 8. COMANDOS ÚTEIS ✅
- [ ] Backend: runserver, makemigrations, migrate, shell
- [ ] Frontend: start, build, test

## 9. DEPLOYMENT (opcional)
- [ ] DEBUG = False
- [ ] ALLOWED_HOSTS configurado
- [ ] HTTPS habilitado
- [ ] Banco de produção
- [ ] Build React: `npm run build`

---

## STATUS GERAL
- [ ] Backend configurado e funcionando
- [ ] Frontend configurado e funcionando
- [ ] MetaMask instalado e configurado
- [ ] Aplicação testada e funcional
- [ ] Problemas resolvidos

**Última verificação:** 2024-10-10 12:00
**Status:** Funcional
