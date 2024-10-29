# TestYachay

## Descripción

TestYachay es una aplicación web desarrollada con React, NodeJS y centrada en la integración con CodyAI.

## Tecnologías

- **React**
- **JavaScript**
- **HTML y CSS**
- **NodeJS**
- **CodyAI API**

## Instalación y uso

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/PVmendez/TestYachay.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd TestYachay
    ```

3. Instala las dependencias del **frontend**:

    ```bash
    cd Frontend
    npm install
    ```

4. Instala las dependencias del **backend**:

    ```bash
    cd ../Backend
    npm install
    ```

5. Abre el proyecto en tu editor de código (por ejemplo, VSCode):

    ```bash
    code .
    ```

### Uso

Para ejecutar la aplicación, necesitas iniciar el **Frontend** y el **Backend** en diferentes terminales.

#### Iniciando el frontend

1. Navega al directorio del **Frontend**:

    ```bash
    cd Frontend
    ```

2. Ejecuta el servidor de desarrollo de React:

    ```bash
    npm start
    ```

#### Iniciando el Backend

1. Abre una nueva terminal y navega al directorio del **Backend**:

    ```bash
    cd Backend
    ```

2. Ejecuta el servidor de Node.js:

    ```bash
    node index.js
    ```

## Estructura del proyecto

```plaintext
TestYachay/
├── Frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   │── package-lock.json
│   │── package.json
│── Backend/
│   │── configurations.json
│   │── index.js
│   │── package-lock.json
│   │── package.json
│── README.md