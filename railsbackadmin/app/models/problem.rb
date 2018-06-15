class Problem < ApplicationRecord
  belongs_to :difficulty
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :companies
  has_many :solutions
end
