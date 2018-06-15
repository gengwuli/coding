class CodeController < ApplicationController
  def show
    render :json => {'hello': 'world'}
  end

  def execute
    code = params['code']
    lang = params['lang']
    res = self.send(lang, code)
    render :json => res
  end

  %w(java cpp ruby javascript python elixir).each do |method|
    module_eval <<-DELEGATORS, __FILE__, __LINE__ + 1
        def #{method}(code)
          #{method.capitalize}Executor.run code
        end
    DELEGATORS
  end
end
