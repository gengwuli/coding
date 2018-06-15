module CodeExecutor

  def run(code)
    o, e, s = Open3.capture3(cmd, :stdin_data=>code)
    {'stdout' => o, 'stderr' => e}
  end

  def cmd
    raise NotImplementedError
  end

  def path
    exe_path = I18n.t 'exe_path'
    Rails.root.join(exe_path).to_s
  end
end
