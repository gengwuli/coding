class Problem < ApplicationRecord
  belongs_to :difficulty
  has_and_belongs_to_many :categories, :uniq => true, :read_only => true
  has_and_belongs_to_many :companies, :uniq => true, :read_only => true
  has_many :solutions
end
