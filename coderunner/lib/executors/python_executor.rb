module PythonExecutor
  class << self
    include CodeExecutor

    def cmd
      "python"
    end
  end
end
