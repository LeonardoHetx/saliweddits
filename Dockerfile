FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# URL do Apps Script dos leads (apps-script/README.md). O Vite a embute no
# bundle no build: docker build --build-arg VITE_LEADS_URL=https://…/exec .
ARG VITE_LEADS_URL=""
ENV VITE_LEADS_URL=$VITE_LEADS_URL
RUN npm run build

FROM nginx:alpine AS runner
RUN apk add --no-cache curl
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
