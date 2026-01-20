# 📋 Instrucciones para Probar el Proxy de Domo

## 🚀 Cómo Iniciar el Servidor

### Opción 1: Usando PowerShell (Recomendado)
```powershell
.\iniciar-servidor.ps1
```

### Opción 2: Usando npm
```bash
npm start
```

### Opción 3: Directamente con Node
```bash
node server.js
```

## 📝 Pasos para Probar

1. **Inicia el servidor** usando una de las opciones anteriores
   - Deberías ver: `🚀 Servidor proxy ejecutándose en http://localhost:3000`

2. **Abre Domo en otra pestaña del navegador**
   - Ve a: `https://unitru-edu-pe.domo.com`
   - **Inicia sesión** con tus credenciales
   - **Mantén esta pestaña abierta** (necesitas estar autenticado)

3. **Abre la aplicación local**
   - Ve a: `http://localhost:3000` en tu navegador
   - O usa la página de prueba: `http://localhost:3000/test.html`

4. **Verifica el resultado**
   - Si funciona: deberías ver la tarjeta de Domo dentro del iframe
   - Si no funciona: abre la consola del navegador (F12) y revisa los errores

## 🔍 Solución de Problemas

### Error: "La conexión fue rechazada"
- Verifica que el servidor esté corriendo
- Asegúrate de que el puerto 3000 no esté siendo usado por otra aplicación

### Error: CSP (Content Security Policy)
- El servidor debería modificar automáticamente los headers CSP
- Si persiste, verifica en la consola del navegador (F12) qué headers están bloqueando

### No se muestra el contenido
- **Asegúrate de estar autenticado en Domo** en otra pestaña
- Las cookies de sesión deben estar activas en el mismo navegador
- Intenta recargar la página (F5)

### Ver logs del servidor
- El servidor muestra logs en la consola donde lo ejecutaste
- Busca mensajes que empiecen con `[PROXY]` para ver las peticiones

## 🧪 Páginas de Prueba

- **Página principal**: `http://localhost:3000`
- **Página de test**: `http://localhost:3000/test.html`

## ⚠️ Notas Importantes

- El servidor debe estar corriendo mientras uses la aplicación
- Debes estar autenticado en Domo en el mismo navegador
- Las cookies de sesión se comparten entre pestañas del mismo navegador
- Si cierras sesión en Domo, necesitarás recargar la página local
