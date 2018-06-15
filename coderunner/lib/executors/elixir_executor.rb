module ElixirExecutor
  class << self
    include CodeExecutor
    def cmd
      "cat > #{path}/eli.exs && elixir -r #{path}/eli.exs"
    end
  end
end