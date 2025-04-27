FROM node:22-alpine

RUN adduser -D student
WORKDIR /home/student

RUN apk add --no-cache \
    bash \
    build-base \
    python3 \
    make \
    g++


COPY src/package.json ./package.json
RUN npm install --ignore-scripts

COPY src/app.js ./app.js
COPY src/bin ./bin/
COPY src/controllers ./controllers/
COPY src/database/config.js ./database/
COPY src/database/database.db ./database/
COPY src/middlewares ./middlewares/
COPY src/models ./models/
COPY src/public ./public/
COPY src/routes ./routes/
COPY src/validators ./validators/
COPY src/views ./views/


COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

RUN chown -R student:student /home/student/ \
    && chmod -R 755 /home/student/database/ \
    && chmod 644 /home/student/database/database.db \
    && npm uninstall bcrypt sqlite3 \
    && npm install sqlite3 bcrypt

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 9000

USER student
WORKDIR /home/student

CMD ["npm", "run", "start"]