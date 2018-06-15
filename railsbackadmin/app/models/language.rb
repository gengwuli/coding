class Language < ApplicationRecord
	has_many :solutions

	def to_s
		name
	end
end
