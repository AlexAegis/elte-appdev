# Cinema

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Compiling and running this is straightforward and only needs Java to be installed, however if you want to jump straight to running the server head over to [releases](https://github.com/AlexAegis/elte-appdev/releases) and grab the newest one. It's a background process so I recommend you starting it in a console if you want to shut it down easily.

```cmd
java -jar cinema.jar
```

## Functional requirements

This application provides an interface for cinema employees top schedule movie screenings and for users to get tickets for such screenings.

Users can register on the homepage, after logging in they can view a list of available movies and then apply to it by buying tickets.

Admins can create movies and events.

## Non-functional requirements

The project supposed to be built into a single java executable which contains both the backend and the frontend.
The application has to be secured via tokens to not let unauthorized access to non-users.
The application has to implement multi grouped user categories in which we can distinguish between managers, admins
and regular users.

Keep every asset of the project fresh and updated.

## Entity Relation

![ER Diagram](./.doc/er-diagram.png 'Logo Title Text 1')

## Folder Structure

- **[/](.)** - Readme, License, Backend POM
  - **[/.doc](./.doc)** - documentation related files
  - **[/.hotswap](./.hotswap)** - bundled jars to enable JVM hot-swap
  - **[/.mvn](./.mvn)** - maven wrapper
  - **[/.postman](./.postman)** - postman profiles for rest endpoint manual testing
  - **[/.vscode](./.vscode)** - VS Code settings
  - **[/src](./src)** - Project source
    - **[/main](./src/main)** - Project source
      - **[/java](./src/main/java)** - Project source
        - **[/hu/elte/assignment](./src/main/java/hu/elte/assignment)** - Backend Sources
          - **[/config](./src/main/java/hu/elte/assignment/config)** - Spring Configurations (Non Security)
          - **[/controller](./src/main/java/hu/elte/assignment/controller)** - REST Endpoints
          - **[/data](./src/main/java/hu/elte/assignment/data)** - ORM descriptions
            - **[/model](./src/main/java/hu/elte/assignment/data/model)** - Entities
            - **[/repository](./src/main/java/hu/elte/assignment/data/repository)** - Spring Repositories
          - **[/security](./src/main/java/hu/elte/assignment/security)** - Security Config and Token provider
          - **[/service](./src/main/java/hu/elte/assignment/service)** - Services
            - **[/auth](./src/main/java/hu/elte/assignment/service/auth)** - Authentication Services
      - **[/resources](./src/main/resources)** - Backend project resources, application config, initial data sql
        - **[/static](./src/main/resources/static)** - The frontend project will be stored here after building
      - **[/web](./src/main/web)** - Fronted project root. Angular, npm, ts, tslint and proxy settings
        - **[/e2e](./src/main/web/e2e)** - End to end testing
        - **[/src](./src/main/web/src)** - Frontend sources, main.ts, index.html, styles.scss
          - **[/app](./src/main/web/src/app)** - Angular sources, routing, main app module
            - **[/components](./src/main/web/src/app/components)** - Components
            - **[/directives](./src/main/web/src/app/directives)** - Directives
            - **[/model](./src/main/web/src/app/model)** - Rest API object models
            - **[/modules](./src/main/web/src/app/modules)** - Modules
            - **[/services](./src/main/web/src/app/services)** - Services
          - **[/environments](./src/main/web/src/environments)** - App Configs
    - **[/test](./src/test)** - Backend testing

## Security

The backend security solution is based on this [article](https://octoperf.com/blog/2018/03/08/securing-rest-api-spring-security/) and a few tweaks here and there to support my use case.

The frontend uses the JWTModule to inject the bearer token into the headers of each call heading towards the API.

An interceptor refreshes the token on each http request so it never expires while in the application is in use.

### User Groups

- Admin
- User

If you're not running this project from a recommended environment (IntelliJ or VS Code) You can still run it using the
command line:

Windows

```cmd
mvnw.cmd spring-boot:run
```

Linux

```bash
mvnw spring-boot:run
```

If you want to use hot reload (and your JVM is capable) just pass the _-P dev_ profile parameter and it will use the
necessary JVM arguments.

Windows

```cmd
mvnw.cmd -P dev spring-boot:run
```

Linux

```bash
mvnw -P dev spring-boot:run
```

## Technologies

### [Angular 7](https://angular.io/)

> **Frontend** framework

### [Spring Boot](https://spring.io/projects/spring-boot)

> **Backend** framework

### [JWT](https://jwt.io/)

> **Token** based authentication and authorization

### [H2](http://www.h2database.com/html/main.html)

> **In-memory database** for development

### [NPM](https://www.npmjs.com/)

> **Package manager** for JS projects

### [Node 11](https://nodejs.org/en/)

> **JS Runtime** featuring V8 from chromium

### [Maven](https://maven.apache.org/)

> **Build tool** for the whole project. Can build and package the frontend too for static hosting.

### [Sass](https://sass-lang.com/)

> **CSS** extension

## Recommendations

### [IntelliJ IDEA](https://www.jetbrains.com/idea/)

> **Java IDE** for the backend of this project

### [Visual Studio Code](https://code.visualstudio.com/)

> **IDE** for mainly the frontend but can be used for both. [Settings](./.vscode/).

### [SonarLint](https://www.sonarlint.org/intellij/)

> **Linting** in IDEA for java.
> Install [this plugin](https://plugins.jetbrains.com/plugin/7973-sonarlint) if you're using IntelliJ

### [DCENV](https://dcevm.github.io/)

> **Hot Reload** capable alternative JVM.

Download the latest release of [DCENV](https://dcevm.github.io/) Light binary, run it with administrator
privileges and install it as an alternative JVM

```bash
java -jar DCEVM-8u181-installer.jar
```

This also needs a [Hot Swap Agent](https://github.com/HotswapProjects/HotswapAgent/releases). Download the latest and
place it somewhere in your computer. I already provided one in the .hotswap folder of this repository.

To be able to use the newly installed alternative VM you have to provide the necessary VM arguments.
You also need to provide the newly downloaded agent aswell. If you use IntelliJ to start the Spring-Boot application
you can do this by opening up the 'Environment' panel and putting this in the VM Options field.

```bash
-XXaltjvm=dcevm -javaagent:./.hotswap/hotswap-agent-1.3.0.jar=autoHotswap=true
```

### [Postman](https://www.getpostman.com/)

> **REST** endpoint testing

### [Fira Code](https://github.com/tonsky/FiraCode)

> **Font** with ligatures.

### [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

> **Reload the Page** for Chrome when the server changes

### [JWT Debugger](https://chrome.google.com/webstore/detail/jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd?hl=en)

> **Inspect tokens** in chrome to check the payload of your token stored in the local storage.

### [Lombok](https://projectlombok.org/)

> **Compile time magic** before compile time.
> Install [this plugin](https://plugins.jetbrains.com/plugin/6317-lombok-plugin) if you're using IntelliJ.
