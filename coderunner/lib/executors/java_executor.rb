module JavaExecutor
  class << self
    include CodeExecutor

    def cmd
      "cat > #{path}/Main.java && javac #{path}/Main.java && java -cp #{path} Main"
    end
  end
end
