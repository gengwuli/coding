Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/code', to: 'code#show'

  post '/code', to: 'code#execute'
end
