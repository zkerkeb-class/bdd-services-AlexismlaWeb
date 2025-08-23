FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
ARG HUSKY=0
RUN if [ "$HUSKY" = "0" ]; then npm ci --omit=dev --ignore-scripts; else npm ci; fi

# Copier le code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port
EXPOSE 4001

# Commande de démarrage
CMD ["npm", "start"]
