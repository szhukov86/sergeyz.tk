FROM ruby:3.2-slim

ENV BUNDLER_VERSION=4.0.6

# Install OS packages required to build native extensions (nokogiri, commonmarker)
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		 build-essential \
		 libxml2-dev \
		 libxslt1-dev \
		 zlib1g-dev \
		 nodejs \
		 git \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

# Copy Gemfile first so we can leverage Docker layer cache for bundle install
COPY Gemfile Gemfile.lock* ./

# Update RubyGems, install Bundler 4, then install gems
RUN gem update --system && gem install bundler -v ${BUNDLER_VERSION} \
	&& bundle config set without 'development:test' \
	&& bundle install --jobs=4 --retry=3

# Copy the rest of the site
COPY . .

CMD ["jekyll","s","--drafts","--future","--force_polling","--livereload","--livereload-port","35730","--host","0.0.0.0","--port","4000"]