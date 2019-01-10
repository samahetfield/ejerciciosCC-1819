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


# Ejercicio 2. Instalar una máquina virtual ArchLinux o FreeBSD para KVM, otro hipervisor libre, usando Vagrant y conectar con ella.

Para realizar este ejercicio, lo primero que debemos hacer es instalar el plugin de Vagrant **libvirt**. La instalación de este plugin se realiza siguiendo los pasos que se nos muestran [a continuación](https://github.com/vagrant-libvirt/vagrant-libvirt).

Una vez que hemos instalado el plugin, procederemos a acceder a [vagrantbox.es](http://www.vagrantbox.es/) y buscaremos una imagen de sistema operativo perteneciente al proveedor KVM.
Por ejemplo, vamos a seleccionar la imagen con nombre **Arch Linux 64 2013-08 KVM/QEMU** y copiaremos su enlace.

Una vez copiado, procederemos a realizar los pasos que vimos en el ejercicio anterior:
- Descargaremos la imagen: ``` vagrant box add archlinuxEjer2 https://vagrant-kvm-boxes.s3.amazonaws.com/archlinux-kvm.box ```
- La inicializaremos de la misma forma: ``` vagrant init archlinuxEjer2 ```
- Finalmente la iniciamos: ``` sudo vagrant up --provider=libvirt ```. En este caso, debemos indicar que no queremos usar Virtualbox, que es el proveedor por defecto que corre Vagrant.
- Para conectarnos a la máquina, simplemente haremos: ``` vagrant ssh ```

# Ejercicio 3. Crear un script para provisionar de forma básica una máquina virtual para el proyecto que se esté llevando a cabo en la asignatura. 

Puesto que para la asignatura se estaba usando Ansible para realizar la provision de nuestras máquinas virtuales, vamos a ver cómo realizar la provisión con Ansible desde el Vagrantfile y se va a seguir las indicaciones que se ven en esta [página](https://www.vagrantup.com/docs/provisioning/ansible.html).

Para ello, añadiremos las siguientes líneas al Vagrantfile:
	
	config.vm.provision "ansible" do |ansible|
    	ansible.playbook = "playbook.yml"
    end

Donde **playbook.yml** es un playbook de ansible que ya teníamos creado y que nos va a permitir realizar el provisionamiento de nuestra máquina virtual, claramente indicando en el archivo /etc/ansible/hosts la IP de nuestra máquina virtual.