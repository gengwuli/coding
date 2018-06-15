1. Create new app

	`rails new my-app --api`

2. Set up git 
	```sh
	git remote add -t master origin https://github.com/gengwuli/coderunner.git
	git pull
	git add .
	git commit -m 'initial commit'
	git push --set-upstream origin master
	git remote -v
	```

3. Enable cors 

	3.1 Uncomment in Gemfile

	3.2 Uncomment in config/initializers/cors.rb

4. Fix hanging issue

	`rake app:update:bin`

5. Generate controller

	`rails generate controller code`

6. Add routes

	`config/routes.rb`
	`post '/code', to: 'code#execute'`

7. Add action to controller
	
	```ruby
        def execute
            code = params['code']
            lang = params['lang']
            res = self.send("#{lang}_handler", code)
            render :json => res
        end	
	```

