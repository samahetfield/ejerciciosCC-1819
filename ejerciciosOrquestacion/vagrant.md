# Ejercicio 1. Instalar una máquina virtual Debian usando Vagrant y conectar con ella.

Lo primero que debemos hacer es instalar Vagrant. Para la instalación se ha seguido tutorial del siguiente [enlace](https://linuxize.com/post/how-to-install-vagrant-on-ubuntu-18-04/);

Una vez instalado, pasaremos a descargarnos una imagen Debian de la lista de imágenes configuradas para Vagrant del siguiente [enlace](http://www.vagrantbox.es/);

Una vez seleccionada la imagen, copiamos el enlace y pasaremos a descargarla, en mi caso, se ejecutará el siguiente comando:

	vagrant box add debianEjer1 https://github.com/holms/vagrant-jessie-box/releases/download/Jessie-v0.1/Debian-jessie-amd64-netboot.box

Descargada la imagen, pasaremos a crear el Vagrantfile indicando el nombre de la máquina:

	vagrant init debianEjer1

Levantamos la máquina virtual con:
	
	vagrant up

Y una vez levantada, podremos conectarnos a ella haciendo uso de ``` vagrant ssh ```.

	sergio@sergiosama:~/vagrant$ vagrant ssh
		
	The programs included with the Debian GNU/Linux system are free software;
	the exact distribution terms for each program are described in the
	individual files in /usr/share/doc/*/copyright.

	Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
	permitted by applicable law.
	Last login: Fri May  1 16:20:47 2015 from 10.0.2.2
	vagrant@Debian-jessie-amd64-netboot:~$ 
