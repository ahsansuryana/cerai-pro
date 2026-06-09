FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html login.html dashboard.html chat.html rating.html print.html /usr/share/nginx/html/
COPY style.css icon.jpeg /usr/share/nginx/html/
COPY js/ /usr/share/nginx/html/js/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]