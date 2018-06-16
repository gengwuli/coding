FROM ruby:2.3

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV LANG C.UTF-8

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle install

COPY . /usr/src/app

RUN apt-get update && apt-get install -y elixir/stable nodejs-legacy openjdk-8-jdk/stable scala/stable

RUN gem install rails && rm -rf /var/lib/apt/lists/* && rm -rf /usr/src/app/tmp/*

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
