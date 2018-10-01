# elte-appdev assignment

## Recommendations

### [SonarLint](https://www.sonarlint.org/intellij/)
> **Linting** in IDEA for java

### [DCENV](https://dcevm.github.io/)
> **Hot Reload** capable alternative JVM.

Download the latest relese of [DCENV](https://dcevm.github.io/) Light binary, run it with administrator 
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

### [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) 
> **Reload the Page** for Chrome when the server changes