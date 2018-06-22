class Company < ApplicationRecord
  has_and_belongs_to_many :problems, :uniq => true, :read_only => true
end
