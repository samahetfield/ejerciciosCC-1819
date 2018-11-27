
# Ejercicio 1. Provisionar una máquina virtual en algún entorno con los que trabajemos habitualmente usando Salt.

Para este ejercicio vamos a instalar salt-ssh en nuestra máquina virtual.
Lo primero que debemos hacer es instalar python y [pip](https://pip.pypa.io/en/stable/installing/#installing-with-get-pip-py) en el caso de que no estén instalados.
Para ello haremos:
	
	sudo apt install python
	curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
	python get-pip.py

Instalado, pasaremos a instalar Salt-ssh.

Primero vamos a crear un directorio y entraremos dentro de él.
	
	mkdir salt-dir
	cd salt-dir

Dentro del directorio realizaremos la instalación de virtualenv y de salt. Devemos instalar virtualenv si no lo tenemos.

	virtualenv venv
	source venv/bin/activate
	pip install salt-ssh

Con esto ya tendremos instalado salt-ssh en ese directorio y podremos activarlo cuando queramos accediendo al directorio ```salt-dir``` creado y ejecutando:
	
	source venv/bin/activate.

Una vez instalado, pasaremos a la configuración de salt para la conexión.
Primerp crearemos el archivo Roster dentro del directorio **salt-dir**. 
	
	touch salt-dir/roster

En este tendremos que introducir la IP de la conexión y el usuario.
	
	managed:
		IP: xxx.xxx.xx.xx
		user: samaniego (en mi caso)

Seguidamente crearemos el Saltfile en el directorio **salt-dir**

	touch salt-dir/Saltfile

En este archivo indicamos dónde se encuentran los archivos roster, log y de configuración:

	salt-ssh:
		roster_file: /home/samaniego/salt-ssh/roster 
		config_dir: /home/samaniego/salt-ssh
		log_file: /home/samaniego/salt-ssh/log.txt 

Por último pasaremos a probar la conexión con:

	salt-ssh -i '*' test.ping


# Ejercicio 2. Instalar los prerrequisitos para ejecutar alguna aplicación propia (la del proyecto de la asignatura u otra) usando Ansible.

Para la realización de este ejercicio vamos a configurar una máquina virtual en Virtualbox para poder conectarnos a ella con Ansible.

Lo primero que debemos de hacer será cambiar el tipo de Red que por defecto nos trae Virtualbox, que es NAT, para pasar a "Adaptador puente".
Con esto realizado podremos iniciar nuestra máquina virtual y comprobar que tiene **ssh** instalado.
Hecho esto, iremos al archivo de configuración de ssh que se encuentra en ```/etc/ssh/sshd_config``` para modificar algunos parámetros y que se nos permita realizar una conexión como root desde nuestra máquina local a la máquina virtual.

Para ello, dentro de este archivo, tendremos que descomentar los siguientes parámetros:
	
	#PasswordAuthentication yes
	#PermitRootLogin yes
	#PubkeyAuthentication yes
	#AuthorizedKeysFile .ssh/authorized_keys
I
Descomentados, únicamente tendremos que conocer nuestra IP de la máquina virtual y conectar vía ssh a ella.
Para conocer la IP de la máquina usaremos el comando ```ìfconfig``` y nos mostrará las IPs.
Ahora, desde nuestra máquina local ejecutaremos:
	
	ssh root@192.168.1.74 -p 22

Cambiando la IP por la que corresponda con tu máquina virtual, nos pedirá la contraseña de superusuario y podremos acceder a nuestra máquina virtual.
Seguidamente, para que no se nos pida continuamente la contraseña, podemos generar una clave pública y pasarla a nuestra máquina virtual y así acceder a ella sin necesidad de contraseña.
Pâra hacer eso ejecutaremos en nuestra máquina local ``` ssh-keygen ``` y nos creará dos ficheros en la ubicación que indiquemos con el nombre que indiquemos.
En mi caso se han llamado ```ansiblev ansiblev.pub```.ç
Una vez localizados ejecutamos el siguiente comando para copiarlos a la máquina virtual:

	ssh-copy-id -i ~/.ssh/ansiblev.pub root@192.168.1.74 -p 22

Se nos pedirá la contraseña y ya tendremos copiada nuestra clave pública para acceder sin contraseña a la máquina virtual.
Finalmente ejecutaremos nuestro primer comando con ansible desde la máquina local:
	
	ansible all -m ping -u root

Si todo se ha configurado correctamente, recibiremos un mensaje como el siguiente:

	192.168.1.74 | SUCCESS => {
    	"changed": false, 
    	"ping": "pong"
	}

Establecemos que el usuario sea root ya que ha sido la conexión ssh que hemos configurado, si se configura como el usuario del sistema y no como superusuario, debemos introducir este usuario.

# Ejercicio 3. Desplegar la aplicación que se haya usado anteriormente con todos los módulos necesarios usando un playbook de Ansible.

Para este ejercicio vamos a crear un Playbook sencillo de prueba, para comprobar que hemos entendido cómo funcionan.
El playbook que vamos a usar es el siguiente:

	---
	- hosts: webserver
	  sudo: yes 
	  tasks:
	   - name: Install git
	     apt: pkg=git state=present


Como vemos, es un playbook sencillo en el que vamos a proceder a instalar git en nuestra máquina virtual.
Lo primero que debemos hacer es tener nuestra máquina virtual ejecutando y tener la dirección de la misma introducida en nuestro archivo de host de ansible, para que el Playbook pueda coger esta IP.
Hecho esto, simplemente tendremos que ejecutar el siguiente comando:

	ansible-playbook ansible.yml -u root --ask-become-pass

Con este comando lo que estamos diciendo es que ejecute el Playbook creado, como usuario "root" (ya que establecimos la conexión de esta forma) y con el parámetro ``` ask-become-pass ``` para que nos pida la contraseña antes de ejecutarse.
Si todo funciona correctamente nos tendrá que dar una salida similar a esta:

	PLAY [webserver] ***************************************************************

	TASK [Gathering Facts] *********************************************************
	ok: [192.168.1.74]

	TASK [Install git] *************************************************************
	ok: [192.168.1.74]

	PLAY RECAP *********************************************************************
	192.168.1.74               : ok=2    changed=0    unreachable=0    failed=0   


Como vemos, git ya estaba instalado y por eso no se ha realizado ningún cambio dentro de nuestra máquina.


# Ejercicios antiguos
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

# Ejercicio 3. Escribir en YAML la siguiente estructura de datos en JSON

	{ "uno": "dos",
	  "tres": [ 4, 5, "Seis", { "siete": 8, "nueve": [ 10, 11 ] } ] }

Se nos ha proporcionado una estructura de datos en JSON que debemos escribir en YAML. Para aprender el uso básico de este lenguaje se ha seguido este [tutorial](https://pharalax.com/blog/yaml-introduccion-al-lenguaje-yaml/).

La estructura en YAML quedaría de la siguiente forma:
	
	uno: dos
	tres: 
		- 4
		- 5
		- Seis
		- Siete: 8
		- Nueve:
			- 10
			- 11
