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

RUN echo "deb http://http.debian.net/debian jessie-backports main" | \
       tee --append /etc/apt/sources.list.d/jessie-backports.list > /dev/null

RUN wget http://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb &&  dpkg -i erlang-solutions_1.0_all.deb

RUN apt-get update && apt-get install -y --no-install-recommends -t  jessie-backports elixir nodejs openjdk-8-jdk

RUN gem install rails && rm erlang-solutions_1.0_all.deb && rm -rf /var/lib/apt/lists/* && rm -rf /usr/src/app/tmp/*

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
