FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css curriculum.js app.js sw.js manifest.webmanifest icon-180.png icon-192.png icon-512.png /usr/share/nginx/html/
EXPOSE 80
