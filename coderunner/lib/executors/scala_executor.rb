module ScalaExecutor
  class << self
    include CodeExecutor

    def cmd
      "cat > #{path}/Main.scala && scala #{path}/Main.scala"
    end
  end
end
