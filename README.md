# Servidor Proxy para Visualizar Tarjetas de Domo

Este proyecto permite visualizar tarjetas privadas de Domo dentro de una página web local usando un servidor proxy que modifica los headers de seguridad.

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor
```bash
npm start
```

### 3. Abrir en el navegador
Abre tu navegador en: `http://localhost:3000`

## ⚠️ Importante

- **Debes estar autenticado en Domo** en otra pestaña del mismo navegador para que funcione correctamente
- El servidor proxy modifica los headers CSP de Domo para permitir el framing desde localhost
- Esto es solo para uso local y desarrollo

## 📝 Notas Técnicas

El servidor proxy:
- Intercepta las peticiones a Domo
- Modifica los headers `Content-Security-Policy` para permitir `frame-ancestors` desde localhost
- Elimina `X-Frame-Options` que podría bloquear el iframe
- Mantiene las cookies y sesión del navegador
