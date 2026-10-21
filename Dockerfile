FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
RUN apk add --no-cache curl
COPY --from=builder /app/dist /usr/share/nginx/html
# nginx.conf vira template: o entrypoint da imagem roda envsubst e injeta
# LEADS_URL (env de runtime) gerando conf.d/default.conf.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# URL do web app do Apps Script que grava os leads (apps-script/README.md).
# Vazia, o /api/lead responde 503 em vez de o nginx falhar no boot.
ENV LEADS_URL=""

HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
