# TODO - Sistema de Gestão Acadêmica MVP

## 1. Adicionar Dependências
- [x] Instalar mongoose, jsonwebtoken, bcryptjs, @types/bcryptjs, @types/jsonwebtoken, sass
- [ ] Verificar e instalar outras dependências necessárias (ex: @types/jsonwebtoken)

## 2. Configurar Conexão MongoDB
- [x] Criar lib/mongodb.ts para conexão com MongoDB
- [x] Configurar variáveis de ambiente (.env.local) para MongoDB URI

## 3. Modelos de Dados (Mongoose)
- [x] Criar models/User.ts (email, password, role, name)
- [x] Criar models/Course.ts (name, description)
- [x] Criar models/Class.ts (name, courseId, teacherId)
- [x] Criar models/Student.ts (name, email) ou linkar a User
- [x] Criar models/Enrollment.ts (studentId, classId)
- [x] Criar models/Grade.ts (studentId, classId, grade, absence, date)

## 4. APIs RESTful Seguras
- [x] Criar middleware para JWT e autorização por role
- [x] Criar /api/auth/login e /api/auth/register
- [x] Criar CRUD /api/courses
- [x] Criar CRUD /api/classes
- [x] Criar CRUD /api/students
- [x] Criar CRUD /api/enrollments
- [x] Criar CRUD /api/grades

## 5. Frontend (Páginas e Componentes)
- [x] Criar páginas de login/register (/login, /register)
- [x] Criar dashboard dinâmico por role
- [x] Criar páginas CRUD para cursos, turmas, alunos
- [x] Criar página de matrícula de alunos
- [x] Criar página para professor lançar notas/faltas
- [x] Criar página de pauta para coordenador
- [x] Criar página para aluno ver notas
- [ ] Criar componentes reutilizáveis

## 6. Autenticação/Autorização
- [ ] Implementar JWT no backend
- [ ] Proteger rotas no frontend com auth

## 7. Estilização
- [ ] Migrar para SCSS, criar arquitetura (variáveis, mixins)
- [ ] Atualizar layout.tsx e globals.css

## 8. Bônus
- [ ] Implementar cálculo automático de média na pauta

## Followup Steps
- [ ] Instalar dependências e configurar MongoDB
- [ ] Testar APIs
- [ ] Testar frontend, corrigir bugs
- [ ] Refinar UI/UX
- [ ] Demonstrar aplicação
