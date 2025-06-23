

# 📦 Peya Delivery API - Setup Guide

Este proyecto contiene el backend de una app tipo Rappi, construida con **Node.js**, **Express** y **MongoDB Atlas**.

Cada alumno podrá desplegar su propia API en la nube siguiendo estos pasos. 🚀

---

## 🔥 Tecnologías usadas
- Node.js
- Express
- MongoDB Atlas
- Render (hosting gratuito)
- Swagger (documentación automática)

---

## 📑 ¿Qué harás?
- Clonar este proyecto a tu propia cuenta (fork).
- Crear tu propia base de datos MongoDB Atlas.
- Subir el backend a Render.
- Tener tu propia API pública.

---

## 🚀 1. Sube el proyecto a Github

1. Sube este repositorio a tu cuenta personal de Github.

2. Entra a la carpeta:

```bash
cd peya-delivery-api
```

---

## ☁️ 2. Crear base de datos en MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas/database) y crea una cuenta gratuita.
2. Crea un **Cluster gratuito** (M0 Tier).
3. Crea un **usuario** (admin/password) con permisos de lectura y escritura.
4. En **Network Access**, permite acceso desde cualquier IP (`0.0.0.0/0`).
5. Copia tu conexión (Connection String), será algo como:

```
mongodb+srv://admin:password@cluster0.xxxxxx.mongodb.net/PeyaDB?retryWrites=true&w=majority
```

---

## ☁️ 3. Subir backend a Render

1. Crea una cuenta en [Render](https://render.com).
2. Haz clic en **New + > Web Service**.
3. Conecta tu cuenta de GitHub.
4. Selecciona este proyecto.
5. Configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node.js
   - **Branch:** `main`
6. Añade las siguientes Environment Variables:

| KEY           | VALUE                                         |
|---------------|-----------------------------------------------|
| `MONGODB_URI` | tu string de conexión de Atlas                |
| `PORT`        | 4000 (opcional, Render asigna automáticamente) |

7. Render hará deploy automático. Espera unos minutos.

---

## 🧪 4. Probar tu API pública

Tu API estará disponible en:

```
https://tu-api.onrender.com
```

Prueba:

- `GET https://tu-api.onrender.com/foods`
- `GET https://tu-api.onrender.com/api-docs` (Swagger)

---

## 🛠 5. Sembrar la base de datos (opcional)

Para llenar tu base de datos de ejemplo:

1. Ejecuta el script `seed.js` localmente:

```bash
npm run seed
```

Esto insertará productos y un usuario demo.

---

## 📚 Endpoints disponibles

- **Foods**
  - `GET /foods`
  - `POST /foods`
  - `GET /foods/:id`
  - `PUT /foods/:id`
  - `DELETE /foods/:id`
- **Users**
  - `POST /users/register`
  - `POST /users/login`
  - `GET /users/:email`
- **Orders**
  - `POST /orders`
  - `GET /orders`

Consulta la documentación en [Swagger](https://tu-api.onrender.com/api-docs).

---

## 📚 How To Render Dashboard

![Demo](RenderDashboard.mov)

---

## ⚠️ Errores comunes

- ❌ Error 403: Verifica que tu IP esté permitida en MongoDB Atlas (Network Access).
- ❌ Error 401/404 al login: Asegúrate de que el email y la contraseña cifrada estén correctos.
- ❌ Conexión rechazada: Revisa que tu `MONGODB_URI` sea correcto y tenga usuario/contraseña válidos.
- ❌ Error de puerto: Render gestiona automáticamente el puerto, solo usa `process.env.PORT` en tu `server.js`.

---

## 📩 Contacto

¿Tienes dudas o necesitas ayuda?

📧 Escríbeme a: **dpereze1105@gmail.com**

---

¡Mucho éxito desplegando tu API! 🚀
