1. rails new proj_name

2. setting up active admin

[activeadmin wiki](https://activeadmin.info/documentation.html)

```
gem 'activeadmin'

# Plus integrations with:
gem 'devise'
gem 'cancan' # or cancancan
gem 'draper'
gem 'pundit'
```

3. change postgres

```
gem "pg"
```

* database.yml
```
default: &default
  adapter: postgresql
  encoding: utf8
  host: db # used in docker-compose change to localhost if needed
  port: 5432
  pool: 5
  username: postgres
  password: my_password

development:
  <<: *default

test:
  <<: *default

production:
  <<: *default
```

```
rails g active_admin:install
```

4 model

* difficulty has many problems 1 to many
* company has many problems, problem belongs to many companies, many to many
* Category has many problems, problems belongs to many categories, many to many
* Solution belongs to 1 problem, problem has many solutions 1 to many

* https://rubyplus.com/articles/3451-Has-Many-Through-and-Has-and-Belongs-to-Many-in-Rails-5, 

```ruby
rails g model Difficulty level:string
rails g model Company name:string
rails g model Category name:string
rails g model Problem problem_no:integer title:string frequency:string reference:string appendix:string url:string difficulty:references
rails g model Language name:string
rails g model Solution solution:text problem:references language:references
rails g migration CreateJoinTableCompanyProblem company problem
rails g migration CreateJoinTableCategoryProblem category problem


rails g active_admin:resource Problem
rails g active_admin:resource Category
rails g active_admin:resource Company
rails g active_admin:resource Difficulty
rails g active_admin:resource Solution
rails g active_admin:resource Language

rake db:migrate
rake db:seed # could add a new user or modify here. 
rails server -p port_number

rails g controller Problems
vim config/routes.rb -> resources :problems


rails g migration AddUniqueNameToCompany

class AddUniqueNameToCompany < ActiveRecord::Migration[5.1]
  def change
        add_index :companies, :name, unique: true
        add_index :difficulties, :level, unique: true
        add_index :categories, :name, unique: true
  end
end
```

### change models admin and controllers
