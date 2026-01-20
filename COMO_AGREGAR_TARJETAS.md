# 📝 Cómo Agregar una Nueva Tarjeta de Domo al Dashboard

Esta guía te explica paso a paso cómo agregar una nueva tarjeta de Domo a tu dashboard.

## 🔍 Paso 1: Obtener el Código del Iframe de Domo

1. Ve a tu cuenta de Domo
2. Abre la tarjeta que quieres agregar
3. Haz clic en el botón de **Compartir** o **Share**
4. Selecciona la opción para **Insertar** o **Embed**
5. Copia el código del iframe que te proporciona Domo

El código debería verse así:
```html
<iframe src="https://embed.domo.com/cards/CODIGO_AQUI" width="600" height="600" marginheight="0" marginwidth="0" frameborder="0"></iframe>
```

## ✏️ Paso 2: Editar el Archivo index.html

1. Abre el archivo `index.html` en tu editor de código
2. Busca la sección que dice `<div class="iframes-wrapper">`
3. Encuentra el último iframe (el que tiene el `id` más alto, por ejemplo `domoFrame8`)
4. Después del último `</div>` que cierra un iframe-container, agrega el nuevo código

### Ejemplo de cómo agregar una nueva tarjeta:

**ANTES (último iframe):**
```html
<div class="iframe-container">
    <iframe 
        id="domoFrame8"
        src="https://embed.domo.com/cards/NYWRz" 
        width="600" 
        height="600" 
        marginheight="0" 
        marginwidth="0" 
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

**DESPUÉS (agregando la nueva tarjeta):**
```html
<div class="iframe-container">
    <iframe 
        id="domoFrame8"
        src="https://embed.domo.com/cards/NYWRz" 
        width="600" 
        height="600" 
        marginheight="0" 
        marginwidth="0" 
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
<div class="iframe-container">
    <iframe 
        id="domoFrame9"
        src="https://embed.domo.com/cards/CODIGO_NUEVO" 
        width="600" 
        height="600" 
        marginheight="0" 
        marginwidth="0" 
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

## 🔢 Paso 3: Actualizar el Número del ID

**IMPORTANTE:** Asegúrate de:
- Cambiar el `id` del iframe al siguiente número (si el último es `domoFrame8`, el nuevo será `domoFrame9`)
- Reemplazar `CODIGO_NUEVO` con el código real de tu tarjeta de Domo (el que viene después de `/cards/` en la URL)

## 📝 Paso 4: Actualizar el JavaScript (Opcional)

El código JavaScript ya está configurado para manejar automáticamente cualquier cantidad de iframes, pero si quieres asegurarte:

1. Busca la sección `<script>` al final del archivo
2. Encuentra el bucle que dice: `for (let i = 1; i <= 8; i++)`
3. Cambia el número `8` por el número total de tarjetas que tienes ahora

**Ejemplo:** Si agregaste una tarjeta y ahora tienes 9 en total:
```javascript
// Cambiar de:
for (let i = 1; i <= 8; i++) {

// A:
for (let i = 1; i <= 9; i++) {
```

## ✅ Paso 5: Verificar que Funciona

1. Guarda el archivo `index.html`
2. Abre el archivo en tu navegador
3. Verifica que la nueva tarjeta aparezca correctamente
4. Asegúrate de que el diseño se vea bien (2 columnas por fila)

## 📤 Paso 6: Subir los Cambios a GitHub

Una vez que hayas verificado que todo funciona:

```bash
# Agregar los cambios
git add index.html

# Hacer commit con un mensaje descriptivo
git commit -m "Agregar nueva tarjeta de Domo: [nombre o código de la tarjeta]"

# Subir los cambios a GitHub
git push
```

## 🎨 Estructura del Código

Cada tarjeta sigue esta estructura:

```html
<div class="iframe-container">
    <iframe 
        id="domoFrame[NÚMERO]"
        src="https://embed.domo.com/cards/[CODIGO_TARJETA]" 
        width="600" 
        height="600" 
        marginheight="0" 
        marginwidth="0" 
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

## 💡 Consejos

- **Nombres descriptivos:** Si tienes muchas tarjetas, considera agregar comentarios HTML para identificar cada una:
  ```html
  <!-- Tarjeta de Ventas -->
  <div class="iframe-container">
      ...
  </div>
  ```

- **Orden:** Las tarjetas se mostrarán en el orden en que las agregues en el código

- **Diseño responsive:** El diseño se adapta automáticamente:
  - Pantallas grandes: 2 columnas por fila
  - Pantallas pequeñas (móviles): 1 columna (apiladas verticalmente)

## ❓ Solución de Problemas

**Problema:** La tarjeta no se muestra
- Verifica que la URL del iframe sea correcta
- Asegúrate de que la tarjeta sea pública (las privadas pueden requerir autenticación)
- Revisa la consola del navegador (F12) para ver errores

**Problema:** El diseño se ve mal
- Verifica que hayas cerrado correctamente todas las etiquetas `</div>`
- Asegúrate de que el `id` del iframe sea único y secuencial

**Problema:** Los cambios no se reflejan
- Haz una recarga forzada del navegador (Ctrl+F5)
- Verifica que guardaste el archivo correctamente

## 📚 Recursos Adicionales

- Documentación de Domo: [https://developer.domo.com/](https://developer.domo.com/)
- Repositorio del proyecto: [https://github.com/Nex7G3n/dashboard](https://github.com/Nex7G3n/dashboard)

---

**¡Listo!** Ahora ya sabes cómo agregar nuevas tarjetas de Domo a tu dashboard. 🎉
