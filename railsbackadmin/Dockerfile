FROM rails:onbuild

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN bundle install && rm -rf /usr/src/app/tmp/*

ENV LANG C.UTF-8

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
