# Ejercicio 1. Instalar chef-solo en la máquina virtual que vayamos a usar.

Para realizar este ejercicio, previamente se ha debido instalar un hipervisor. En mi caso se ha seleccionado **Virtualbox**.
Para la [instalación de Virtualbox](https://maslinux.es/como-instalar-virtualbox-en-ubuntu-18-04/) únicamente debemos seguir los pasos.

Seguidamente tendremos que descargarnos una imagen de un sistema operativo para nuestra máquina virtual. Para la realización de los ejercicios se ha utilizado Ubuntu Server 18.04.

Una vez tengamos nuestra máquina virtual configurada, para instalar chef-solo sobre ella será necesario ejecutar los siguientes comandos.
	
	$sudo su
	cd ~
	curl -L https://www.opscode.com/chef/install.sh | bash

Hecho esto tendremos chef-solo configurado instalado, que podremos comprobar ejecutando el comando ``` chef-solo -v``` donde nos mostrará la versión instalada.



# Ejercicio 2. Crear una receta para instalar nginx, tu editor favorito y algún directorio y fichero que uses de forma habitual.

Antes de realizar el ejercicio, para poder generar automáticamente la estructura de directorios de chef, debemos instalar el Development Kit de Chef.
Para ello, seguimos las [instrucciones](https://docs.chef.io/install_dk.html).

Una vez instalado, podremos generar nuestra estructura de directorios sin ningún problema ejecutando el siguiente comando:
		
	chef generate app ejercicio2

Hecho esto, se nos creará una estructura de directorios en el lugar que la hayamos ejecutado.
Ahora entraremos a esta estructura de directorios, concretamente a la ruta ```/ejercicio2/cookbooks/ejercicio2/recipes``` para editar el archivo ```default.rb``` y crear la receta que se nos pide.
El archivo ```default.rb``` quedará de la siguiente forma:

	package 'emacs'
	package 'nginx'
	directory '/home/samaniego/MII'
	file "/home/samaniego/MII/Tarea" do
		owner "samaniego"
		group "samaniego"
		mode 00544
		action :create
		content "Hacer los ejercicios de CC"
	end

Ya tenemos creada nuestra receta, ahora será necesario indicar la referencia a esta receta desde el archivo ```node.json``` que lo crearemos en la ruta ```/ejercicio2``` y tendrá el contenido que se muestra a continuación.
	
	{
		"run_list": [ "recipe[ejercicio2]" ]
	}	

Finalmente tendremos que crear el archivo ```solo.rb``` que nos permitirá incluir las referencias a estos dos archivos y que será el que se ejecute.
Para ello le modificaremos el contenido y lo dejaremos como sigue:

	file_cache_path "/home/samaniego/ejercicio2"
	cookbook_path "/home/samaniego/ejercicio2/cookbooks"
	json_attribs "/home/samaniego/ejercicio2/node.json"

Con esto, ya solamente nos quedará ejecutar el siguiente comando y veremos cómo van apareciendo unos mensajes por cada una de las órdenes que se han indicado.

	sudo chef-solo -c ejercicio2/solo.rb

Hecho esto ya tendremos instalado nuestro editor, nginx y el directorio con el archivo Tareas.