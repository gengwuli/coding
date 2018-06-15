module JavascriptExecutor
  class << self
    include CodeExecutor
    def cmd
      'nodejs'
    end
  end
end
