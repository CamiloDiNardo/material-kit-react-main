# script para Iniciar con docker automaticamente en linux
# Parar el container
sudo docker container stop material-kit-react
sudo docker container rm material-kit-react

# Correr el container
sudo docker-compose -f docker-compose.prod.yml up --build -d
# Mensaje del que contenedor paro
echo "material-kit-react esta corriendo"
