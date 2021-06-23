FROM node:12

WORKDIR /usr/src/app

RUN apt-get update && apt-get -y install xvfb && apt-get -y install fontconfig && apt-get -y install libssl1.0-dev && apt-get -y install libx11-dev libx11-xcb-dev libxcb-icccm4-dev libxcb-image0-dev libxcb-keysyms1-dev libxcb-randr0-dev libxcb-render-util0-dev libxcb-render0-dev libxcb-shm0-dev libxcb-util0-dev libxcb-xfixes0-dev libxcb-xkb-dev libxcb1-dev libxfixes-dev libxrandr-dev libxrender-dev
COPY public/fonts/IranSans/ttf /usr/share/fonts/truetype/
RUN fc-cache -f -v
COPY . .
ENV PORT 3333
ENV HOST 0.0.0.0
RUN yarn
RUN node ace migration:run --force
# RUN yarn start
# EXPOSE 3333
