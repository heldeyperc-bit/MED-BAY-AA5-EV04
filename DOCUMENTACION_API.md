# API REST MED-BAY

## Evidencia

GA7-220501096-AA5-EV03  
Diseño y desarrollo de servicios web - proyecto

## Proyecto

MED-BAY - Sistema de Gestion Medica

## Descripcion

La API REST MED-BAY permite gestionar servicios relacionados con
autenticacion de usuarios, pacientes, medicos y citas medicas.

La aplicacion fue desarrollada con Node.js y Express y utiliza
respuestas en formato JSON.

## URL base

http://localhost:3000

---

# 1. AUTENTICACION

## Registro de usuario

Metodo:

POST

Endpoint:

/api/registro

Funcion:

Permite registrar un nuevo usuario en el sistema.

Validaciones:

- Campos obligatorios.
- Longitud minima del nombre de usuario.
- Longitud minima de la contrasena.
- Validacion de usuario duplicado.
- Contrasena protegida mediante bcryptjs.

Codigos principales:

- 201 Created
- 400 Bad Request
- 409 Conflict

## Inicio de sesion

Metodo:

POST

Endpoint:

/api/login

Funcion:

Permite autenticar un usuario registrado.

Codigos principales:

- 200 OK
- 400 Bad Request
- 401 Unauthorized

---

# 2. PACIENTES

## Listar pacientes

GET /api/pacientes

Obtiene todos los pacientes registrados.

Respuesta correcta:

200 OK

## Consultar paciente

GET /api/pacientes/:id

Obtiene un paciente mediante su identificador.

Respuestas:

- 200 OK
- 404 Not Found

## Registrar paciente

POST /api/pacientes

Campos:

- nombre
- apellido
- documento
- edad
- genero
- telefono
- correo
- direccion

Validaciones:

- Todos los campos son obligatorios.
- Edad mayor que cero.
- Documento no duplicado.

Respuestas:

- 201 Created
- 400 Bad Request
- 409 Conflict

## Actualizar paciente

PUT /api/pacientes/:id

Permite modificar los datos de un paciente existente.

Respuestas:

- 200 OK
- 400 Bad Request
- 404 Not Found
- 409 Conflict

## Eliminar paciente

DELETE /api/pacientes/:id

Elimina un paciente mediante su identificador.

Respuestas:

- 200 OK
- 404 Not Found

---

# 3. MEDICOS

## Listar medicos

GET /api/medicos

Obtiene todos los medicos registrados.

## Consultar medico

GET /api/medicos/:id

Consulta un medico mediante su identificador.

## Registrar medico

POST /api/medicos

Campos:

- nombre
- apellido
- documento
- especialidad
- telefono
- correo

Validaciones:

- Campos obligatorios.
- Documento no duplicado.

## Actualizar medico

PUT /api/medicos/:id

Actualiza los datos de un medico registrado.

## Eliminar medico

DELETE /api/medicos/:id

Elimina un medico mediante su identificador.

Codigos utilizados:

- 200 OK
- 201 Created
- 400 Bad Request
- 404 Not Found
- 409 Conflict

---

# 4. CITAS

## Listar citas

GET /api/citas

Obtiene todas las citas registradas.

## Consultar cita

GET /api/citas/:id

Obtiene una cita mediante su identificador.

## Registrar cita

POST /api/citas

Campos:

- pacienteId
- medicoId
- fecha
- hora
- motivo
- estado

Validaciones:

- El paciente debe existir.
- El medico debe existir.
- Fecha en formato AAAA-MM-DD.
- Hora en formato HH:MM.
- No se permite asignar al mismo medico dos citas en la misma fecha y hora.

## Actualizar cita

PUT /api/citas/:id

Permite modificar una cita existente.

## Eliminar cita

DELETE /api/citas/:id

Elimina una cita registrada.

Codigos utilizados:

- 200 OK
- 201 Created
- 400 Bad Request
- 404 Not Found
- 409 Conflict

---

# Tecnologias utilizadas

- Node.js
- Express
- bcryptjs
- JavaScript
- JSON
- Git
- GitHub

# Conclusion

Los servicios web desarrollados permiten reutilizar las funcionalidades
principales del proyecto MED-BAY mediante una API REST. Se implementaron
operaciones para autenticacion, gestion de pacientes, gestion de medicos
y gestion de citas, incluyendo validaciones y codigos de respuesta HTTP
para controlar correctamente los diferentes escenarios.
