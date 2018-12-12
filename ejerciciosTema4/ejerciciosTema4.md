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




