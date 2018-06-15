class Difficulty < ApplicationRecord
  has_many :problems

  def to_s
    level
  end
end
