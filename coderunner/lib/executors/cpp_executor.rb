module CppExecutor
  class << self
    include CodeExecutor

    def cmd
      "cat > #{path}/main.cpp && g++ -std=c++11 #{path}/main.cpp -o #{path}/main && #{path}/main"
    end
  end
end
