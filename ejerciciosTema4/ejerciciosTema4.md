# Ejercicios Tema 4

# 1. Crear una máquina virtual Ubuntu e instalar en ella un servidor nginx para poder acceder mediante web.

Lo primero que debemos hacer es instalar azure-cli. Para ello únicamente debemos ejecutar el siguiente comando:

	sudo npm install azure-cli

Una vez instalado, para hacer uso de nuestra cuenta de azure tendremos que hacer ``` login ```, así que escribiremos:

	azure login

Seguiremos los pasos indicados, abriendo el navegador e introduciendo el código para sincronizar nuestras cuentas.
Hecho esto, ya podremos listar las máquinas virtuales disponibles ejecutando:

	azure vm image list

Se nos pedirá una serie de parámetros como son:
	
	Location: West Europe
	Publisher: Canonical (ya que buscamos las imágenes de Ubuntu)

Ahora nos saldrán todas las imágenes de ubuntu disponibles en esta región.

Lo siguiente que queremos hacer es crear una máquina virtual, pero para ello primero es necesario un grupo de recursos en el que alojarla.

	azure group create ejercicio1Tema5 francecentral

Con este comando crearemos el grupo de recursos en el que alojaremos nuestra máquina, en la región "France Central".
Se ha usado esta región, ya que con "West Europe" daba el siguiente error al crear la máquina virtual:
error:   

	The requested size for resource '/subscriptions/f48ddf6a-0348-4285-b7bb-7ed7b3edec19/resourceGroups/ejercicio1/providers/Microsoft.Compute/virtualMachines/vmEjer1' is currently not available in location 'westeurope' zones '' for subscription 'f48ddf6a-0348-4285-b7bb-7ed7b3edec19'. Please try another size or deploy to a different location or zones. See https://aka.ms/azureskunotavailable for details.

Ahora ya pasaremos a crear nuestra máquina virtual. Se intentó crear la máquina haciendo uso de las órdenes que se muestran en el temario de la asignatura, pero me daban errores, así que buscando [tutoriales](https://docs.microsoft.com/es-es/azure/virtual-machines/linux/quick-create-cli-nodejs) encontré el siguiente comando, que me creó la máquina correctamente:

	sergio@sergiosama:~$ azure vm quick-create
	info:    Executing command vm quick-create
	Resource group name:  ejercicio1Tema4
	Virtual machine name:  vmEjer1
	Location name:  francecentral
	Operating system Type [Windows, Linux]:  Linux
	ImageURN (in the format of "publisherName:offer:skus:version") or a VHD link to the user image:  canonical:UbuntuServer:18.10-DAILY:18.10.201811020
	User name:  sergio
	Password: *************

Con esto ya tendremos nuestra máquina virtual, ahora pasaremos a conectarnos vía **SSH** para instalar **nginx**.

	ssh sergio@40.89.152.128

Una vez conectados, instalaremos nginx:

	sudo apt install nginx

Para comprobar que se ha instalado correctamente, accederemos a la IP que nos ha dado la máquina virtual y nos debería de salir la pantalla de bienvenida de **nginx**.

# 2. Crear una instancia de una máquina virtual Debian y provisionarla usando alguna de las aplicaciones vistas en el tema sobre herramientas de aprovisionamiento

Para este ejercicio lo primero que haremos será [instalar Azure-CLI 2.0](https://docs.microsoft.com/es-es/cli/azure/install-azure-cli-apt?view=azure-cli-latest).

Será necesario crear un grupo de recursos, en el que alojar la máquina, que haremos con el siguiente comando:

	az group create -l westeurope -n CCGroupEU

Una vez lo tengamos instalado, tendremos que hacer login nuevamente, de la misma forma que lo hicimos en el anterior ejercicio.
Seguidamente, para poder usar **jq** y aprovecharnos de las ventajas que nos da las respuestas en JSON, tendremos que instalarlo con la siguiente orden: ``` sudo apt install jq ```.
Una vez instalado, ya podremos ver las imágenes filtradas que deseemos. Como lo que queremos son imágenes Debian, ejecutaremos el siguiente comando:

	sergio@sergiosama:~$ az vm image list | jq '.[] | select( .offer | contains("ebian"))'
	You are viewing an offline list of images, use --all to retrieve an up-to-date list
	{
	  "offer": "Debian",
	  "publisher": "credativ",
	  "sku": "8",
	  "urn": "credativ:Debian:8:latest",
	  "urnAlias": "Debian",
	  "version": "latest"
	}

Como vemos, el Alias es Debian, por lo que podremos instalar la imagen usando su alias con el siguiente comando:

	az vm create -g CCGroupEU -n vmEjer2 --image Debian

Hecho esto ya tendremos nuestro máquina creada.
Ahora, como el provisionamiento se va a realizar con Ansible, lo que haremos será añadir su IP pública al archivo ```/etc/ansible/hosts ```
Y ejecutaremos un playbook, que nos instalará algunos paquetes y clonará nuestro repositorio de GitHub (parecido al playbook del Hito2, pero sin lanzar la aplicación).


	sergio@sergiosama:~$ ansible-playbook ansible_Ejer.yml 
	PLAY [vmEjercicios] ****************************************************************************************
	TASK [Gathering Facts] *************************************************************************************
	ok: [40.68.22.99]		
	TASK [Install packages] ************************************************************************************
	ok: [40.68.22.99]
	TASK [clone repository] ************************************************************************************
	ok: [40.68.22.99]
	TASK [Install dependences] *********************************************************************************
	ok: [40.68.22.99]
	PLAY RECAP *************************************************************************************************
	40.68.22.99                : ok=4    changed=0    unreachable=0    failed=0   

Hecho esto, podremos conectarnos vía ssh y comprobar que se ha clonado el repositorio:

	sergio@vmEjer2:~$ ls /home/PersonalCC/
	bin   infoSerie.js  package.json  provision  routes         SerieService.js
	docs  LICENSE       Procfile      README.md  SerieClass.js  test
