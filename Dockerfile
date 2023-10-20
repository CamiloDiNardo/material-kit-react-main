# Contenedor Docker donde vamos a pasar archivos y crear carpetas para poder usarlo
# este dockerfile se va a convertir en una imagen para que a traves de esa imagen
# crear contenedores.
# el nombre y la version de la imagen que vamos a usar
FROM node:18.18.0-alpine
# creamos el directorio que vamos a usar para trabajar en el contenedor.
# se le suele poner /app o /usr/src/app. todo lo que instalemos se hace a partir de 
# este directorio, asi que si queres instalar algo en otro lado tenemos que poner
# otra cosa que no sea un . o un ./ en copy y add etc. 
WORKDIR /usr/src/app
# copiamos todo lo que sea json a ese directorio recien creado . o ./ simbolizan
# el directorio donde estamos parados, copiamos esto es para pegar las dependencias en 
# el directorio que creamos. el * significa que todo lo que sea json se copia.
# porque pasamos primero los package.jsons y desp toda la app en ves de pasarla 
# toda junta? lo hacemos xq cuando hacemos npm ci o npm install todos los modulos
# que se descargan vienen adecuados a las caracteristicas de nuestra pc y si las
# pasamos y si tenemos algo instalado de forma global en la pc, cuando pasemos todo
# al contenedor nos puede modificar los modulos, y eso podria hacer que tengamos
# problemas con la imagen y el contenedor.
COPY package*.json ./
#Ahora tenemos que instalar estas dependencias, que solo las pegamos pero no estan
#instaladas, para eso hacemos el comando de aca abajo.
# npmi ci en ves de npm install sirve para que cuando docker construya la imagen, 
#instale las versiones especificas de las dependencias y el cache clean para
#limpiar el cache. 

RUN npm ci && npm cache clean --force
# copiamos todos los archivos que faltan (carpetas src etc. para desp poder 
# ejecutar nuesta app. . . significa que copie todo lo que este donde estamos
#parados y lo pegue en el contenedor, tmb donde estamos parados. OJO tene en cuenta
# que cuando hacemos este copy, no va a copiar los json porque docker los ignora
#gracias al .dockerignore. eso es bueno xq la idea no es copiar estos modulos y 
#pegarlos, porque reemplazariamos los anteriores que estan bien instalados.

COPY . .
# hacemos un build de la app que esta en el contenedor 
RUN npm run build
#puerto que se expone para poder conectarlo con el mundo
#con esto va a tener internet. sino no tendria.
#tmb con esto vamos a poder conectarlo con el puerto de la
#pc
EXPOSE 3002
#Comando que se va a ejecutar x defecto cada ves que 
#iniciemos el contenedor. este va a ser su proceso principal
# y si deja de funcionar el contenedor se apaga.
# el comando en este caso es npm start
CMD [ "npm", "start"]
# ahora nos fijamos que docker deskop este abierto y corriendo xq sino los comandos
# que pongamos no van a funcionar.
#Ahora solo vamos al archivo de nuestra pc en la terminal y usamos 
#docker build -t camilodinardo/Calculadora (nombre de usuario en docker hub + name
# del proyecto.)