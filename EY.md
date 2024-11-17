# Prueba Técnica - .NET Developer FY24

## Ejercicio 1: Web Scraping para Búsqueda en Listas de Alto Riesgo

### Objetivo
Trabajando en una institución financiera, se requiere desarrollar una herramienta automatizada para realizar búsquedas en línea e identificar entidades en listas de alto riesgo (sanciones internacionales, listas de vigilancia, entre otras bases de datos). La tarea es crear un proceso de *web scraping* que extraiga la información necesaria y la presente de forma legible para revisión.

### Enfoque
Emplear herramientas tecnológicas a elección para desarrollar una REST API que permita obtener la información relevante dado el nombre de una entidad.

### Tecnología
Lenguajes y frameworks a elección del candidato. Los resultados deben ser presentados en una colección de Postman ejecutable.

### Requerimientos
- La función debe buscar el nombre de la entidad en al menos una de las fuentes propuestas mediante *web scraping*.
- La búsqueda debe retornar el número de resultados y un arreglo con los elementos encontrados, considerando los atributos de las fuentes propuestas.
- Validaciones deseables:
  - Número máximo de llamadas por minuto: 20.
  - Autenticación de la REST API.

### Fuentes Propuestas
- **Offshore Leaks Database**: [https://offshoreleaks.icij.org](https://offshoreleaks.icij.org)
  - Atributos: Entity, Jurisdiction, Linked To, Data From
- **The World Bank**: [https://projects.worldbank.org/en/projects-operations/procurement/debarred-firms](https://projects.worldbank.org/en/projects-operations/procurement/debarred-firms)
  - Atributos: Firm Name, Address, Country, From Date, To Date, Grounds
- **OFAC**: [https://sanctionssearch.ofac.treas.gov](https://sanctionssearch.ofac.treas.gov)
  - Atributos: Name, Address, Type, Program(s), List, Score

### Entregables
- Código fuente en formato ZIP o repositorio GIT.
- Instrucciones para el despliegue.
  - Opcional: Despliegue en entorno cloud (Azure o AWS).
- Colección de Postman con la REST API desarrollada.
- Ejemplos de solicitudes para la REST API.

---

## Ejercicio 2: Aplicación Web para Debida Diligencia de Proveedores y Cruce con Listas de Alto Riesgo

### Objetivo
Desarrollar una aplicación web que facilite el proceso de debida diligencia de proveedores. La aplicación debe permitir a los usuarios ingresar información sobre los proveedores y realizar un cruce automático con listas de alto riesgo.

### Enfoque
Utilizar un enfoque de SPA (Single Page Application) para administrar un inventario de empresas y realizar el cruce con las listas de alto riesgo del ejercicio anterior.

### Tecnología
- **Back-end**: .NET Framework o .NET Core
- **Front-end**: React o Angular
- **Base de datos**: SQL Server
- **Servidores**: IIS Server, IIS Express o Kestrel

### Requerimientos
- **Gestión de Proveedores**: Crear, editar y eliminar proveedores con los siguientes campos:
  - Razón social
  - Nombre comercial
  - Identificación tributaria (11 dígitos)
  - Número telefónico
  - Correo electrónico
  - Sitio web (con redirección)
  - Dirección física
  - País (desplegable)
  - Facturación anual en dólares
  - Fecha de última edición
- **Validación**: Los formularios deben contar con validación y mensajes de error amigables.
- **Listado de Proveedores**: Visualizar en tabla ordenada por fecha de última edición.
- **Opciones de Proveedor**: Ver, editar, eliminar y screening (cruce con listas de alto riesgo).
  - La opción de screening debe permitir seleccionar la fuente y ejecutar automáticamente la búsqueda, mostrando resultados en formato tabla.
- **SPA (Single Page Application)**: La aplicación debe cargar y mostrar el contenido en una sola página.

### Características Opcionales
- Uso de frameworks de UX (Material Design, Fluent UI).
- Implementación de filtros, ordenamiento y paginado del listado de proveedores.
- Autenticación de la plataforma.

### Entregables
- Código fuente en formato ZIP, repositorio GIT o Google Drive.
- Instrucciones para despliegue.
  - Opcional: Despliegue en entorno cloud (Azure o AWS).
- Scripts de creación de la base de datos y carga inicial de datos (o uso de migraciones).
- Demostración de la aplicación en vivo:
  - Sesión virtual para exponer la solución.
  - Explicación técnica y funcional de la plataforma.
  - Idiomas recomendados: inglés o español.
