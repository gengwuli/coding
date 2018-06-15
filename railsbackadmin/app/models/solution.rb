class Solution < ApplicationRecord
  belongs_to :problem
  belongs_to :language

  def to_s
  	language
  end
end
