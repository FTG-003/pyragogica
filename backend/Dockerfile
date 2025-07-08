# Usa una versione stabile di Node.js
FROM node:18

# Imposta la working directory
WORKDIR /app

# Copia i file di package
COPY package*.json ./

# Installa le dipendenze
RUN npm install --production

# Copia il resto del codice backend
COPY . .

# Espone la porta (modifica se usi una porta diversa)
EXPOSE 8080
# Comando di avvio
CMD ["npm", "start"] 