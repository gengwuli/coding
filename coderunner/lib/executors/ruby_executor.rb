module RubyExecutor
  class << self
    include CodeExecutor

    def cmd
      "ruby"
    end
  end
end
